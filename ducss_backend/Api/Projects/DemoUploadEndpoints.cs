
using Ducss;
using System.Security.Cryptography;
using System.Text;
using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace Ducss.Api.Projects;

public static class DemoUploadEndpoints
{
    private static readonly string UploadDirectory =
        Path.Combine(Path.GetTempPath(), "ducss-demo-uploads");
    private static readonly ConcurrentDictionary<string, TemporaryUpload>
        ActiveUploads = new();
    private record TemporaryUpload(
        string FilePath,
        string Token,
        DateTime ExpiresAt
    );
    private static readonly HttpClient client = new HttpClient();
    public static void MapDemoUploadEndpoints(this WebApplication app)
    {
        // Temporary endpoint used by Google Apps Script to download the MP4.
        app.MapGet("/api/demo-download/{uploadId}", (
            string uploadId,
            HttpRequest httpRequest
        ) =>
        {
            Console.WriteLine($"Download requested: {uploadId}");
            Console.WriteLine($"Active uploads: {ActiveUploads.Count}");

            if (!ActiveUploads.TryGetValue(uploadId, out var upload))
            {
                Console.WriteLine("FAILED: Upload ID not found.");
                return Results.NotFound();
            }

            Console.WriteLine($"Expiry: {upload.ExpiresAt:O}");
            Console.WriteLine($"Current time: {DateTime.UtcNow:O}");
            Console.WriteLine($"File path: {upload.FilePath}");
            Console.WriteLine($"File exists: {File.Exists(upload.FilePath)}");

            if (upload.ExpiresAt < DateTime.UtcNow)
            {
                Console.WriteLine("FAILED: Upload expired.");
                ActiveUploads.TryRemove(uploadId, out _);
                return Results.NotFound();
            }

            string? suppliedToken =
                httpRequest.Headers["X-Demo-Download-Token"].FirstOrDefault();

            if (string.IsNullOrEmpty(suppliedToken) ||
                !CryptographicOperations.FixedTimeEquals(
                    Encoding.UTF8.GetBytes(upload.Token),
                    Encoding.UTF8.GetBytes(suppliedToken)))
            {
                Console.WriteLine("FAILED: Invalid download token.");
                return Results.Unauthorized();
            }

            if (!File.Exists(upload.FilePath))
            {
                Console.WriteLine("FAILED: Temporary file does not exist.");
                return Results.NotFound();
            }

            Console.WriteLine("SUCCESS: Serving MP4.");

            return Results.File(
                upload.FilePath,
                "application/octet-stream"
            );
        });

        app.MapPost("/api/demo-upload", async (
            [FromForm] IFormFile demo,
            [FromForm] string title,
            [FromForm] int year,
            HttpRequest httpRequest
        ) =>
        {
            // 1. Authenticate request
            string? expectedSecret =
                Environment.GetEnvironmentVariable("DEMO_UPLOAD_KEY");
            string? suppliedSecret =
                httpRequest.Headers["X-Demo-Secret"].FirstOrDefault();
            if (string.IsNullOrWhiteSpace(expectedSecret))
                return Results.Problem(
                    "API authentication is not configured."
                );
            if (string.IsNullOrEmpty(suppliedSecret) ||
                !CryptographicOperations.FixedTimeEquals(
                    Encoding.UTF8.GetBytes(expectedSecret),
                    Encoding.UTF8.GetBytes(suppliedSecret)))
            {
                return Results.Unauthorized();
            }

            // 2. Validate request
            if (demo == null || demo.Length == 0)
                return Results.BadRequest("No file uploaded.");
            if (string.IsNullOrWhiteSpace(title))
                return Results.BadRequest("A title is required.");
            if (year < 2000 || year > 2100)
                return Results.BadRequest("Invalid year.");
            const long maxFileSize = 50 * 1024 * 1024;
            if (demo.Length > maxFileSize)
                return Results.BadRequest("File exceeds 50 MB.");
            if (demo.ContentType != "video/mp4")
                return Results.BadRequest("Only MP4 videos are accepted.");
            // These are used for cleanup in finally.
            string? uploadId = null;
            string? tempFilePath = null;

            try
            {
                // 3. Get configuration
                string? scriptUrl =
                    Environment.GetEnvironmentVariable("DEMO_UPLOAD_URL");
                string? downloadBaseUrl =
                    Environment.GetEnvironmentVariable("DEMO_DOWNLOAD_BASE_URL");
                if (string.IsNullOrWhiteSpace(scriptUrl))
                    return Results.Problem(
                        "Demo upload URL is not configured."
                    );
                if (string.IsNullOrWhiteSpace(downloadBaseUrl))
                    return Results.Problem(
                        "Demo download URL is not configured."
                    );

                // 4. Prepare filename
                string filename = Path.GetFileName(title.Trim());
                if (!filename.EndsWith(
                    ".mp4",
                    StringComparison.OrdinalIgnoreCase))
                {
                    filename += ".mp4";
                }

                // 5. Save the uploaded file temporarily
                Directory.CreateDirectory(UploadDirectory);
                uploadId = Convert.ToHexString(
                    RandomNumberGenerator.GetBytes(32)
                );
                string downloadToken = Convert.ToHexString(
                    RandomNumberGenerator.GetBytes(32)
                );
                tempFilePath = Path.Combine(
                    UploadDirectory,
                    $"{uploadId}.mp4"
                );
                await using (var fileStream = new FileStream(
                    tempFilePath,
                    FileMode.CreateNew,
                    FileAccess.Write,
                    FileShare.Read))
                {
                    await demo.CopyToAsync(fileStream);
                }

                // 6. Validate the MP4 signature
                await using (var fileStream = new FileStream(
                    tempFilePath,
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.Read))
                {
                    byte[] header = new byte[8];
                    int bytesRead = await fileStream.ReadAsync(header);
                    if (bytesRead < 8 ||
                        Encoding.ASCII.GetString(header, 4, 4) != "ftyp")
                    {
                        return Results.BadRequest("Invalid MP4 file.");
                    }
                }

                // 7. Register the temporary upload
                ActiveUploads[uploadId] = new TemporaryUpload(
                    tempFilePath,
                    downloadToken,
                    DateTime.UtcNow.AddMinutes(5)
                );

                // 8. Prepare the Apps Script download URL
                string downloadUrl =
                    $"{downloadBaseUrl.TrimEnd('/')}/{uploadId}";

                // 9. Prepare query parameters
                var query = await new FormUrlEncodedContent(
                    new Dictionary<string, string>
                    {
                        ["key"] = expectedSecret
                    }
                ).ReadAsStringAsync();
                var url = $"{scriptUrl}?{query}";

                // 10. Send metadata
                var metadata = new
                {
                    filename = filename,
                    mimeType = "video/mp4",
                    year = year,
                    downloadUrl = downloadUrl,
                    downloadToken = downloadToken
                };
                using var content = new StringContent(
                    JsonSerializer.Serialize(metadata),
                    Encoding.UTF8,
                    "application/json"
                );
                using var request = new HttpRequestMessage(
                    HttpMethod.Post,
                    url
                )
                {
                    Content = content
                };
                var appsScriptTotalTimer = Stopwatch.StartNew();

                // 1. Send request and wait for response headers
                var sendTimer = Stopwatch.StartNew();
                var response = await client.SendAsync(
                    request,
                    HttpCompletionOption.ResponseHeadersRead
                );
                sendTimer.Stop();

                // 2. Read the response body
                var readTimer = Stopwatch.StartNew();
                var result = await response.Content.ReadAsStringAsync();
                readTimer.Stop();
                appsScriptTotalTimer.Stop();

                // 3. Log timings
                Console.WriteLine("Apps Script C# timings:");
                Console.WriteLine($"  Send request / wait for headers: {sendTimer.ElapsedMilliseconds} ms");
                Console.WriteLine($"  Read response body: {readTimer.ElapsedMilliseconds} ms");
                Console.WriteLine($"  Total: {appsScriptTotalTimer.ElapsedMilliseconds} ms");
                Console.WriteLine("Apps Script HTTP status: " + response.StatusCode);
                Console.WriteLine("Apps Script response: " + result);
                if (!response.IsSuccessStatusCode)
                {
                    return Results.Problem(
                        detail: "Google Apps Script upload failed: " + result,
                        statusCode: 502
                    );
                }

                // 11. Check Apps Script response
                using var json = JsonDocument.Parse(result);
                if (!json.RootElement.TryGetProperty(
                    "success", out var success) ||
                    success.ValueKind != JsonValueKind.True)
                {
                    return Results.Problem(
                        "Google Drive rejected the upload.",
                        statusCode: StatusCodes.Status502BadGateway
                    );
                }
                return Results.Content(
                    result,
                    "application/json"
                );
            }
            catch (Exception error)
            {
                app.Logger.LogError(error, "Demo upload failed.");

                return Results.Problem("Demo upload failed.");
            }
            finally
            {
                // 12. Remove the temporary upload after Apps Script finishes
                if (uploadId != null)
                    ActiveUploads.TryRemove(uploadId, out _);

                if (tempFilePath != null && File.Exists(tempFilePath))
                {
                    try
                    {
                        File.Delete(tempFilePath);
                    }
                    catch (Exception error)
                    {
                        app.Logger.LogWarning(
                            error,
                            "Could not delete temporary demo upload."
                        );
                    }
                }
            }
        }).DisableAntiforgery();
    }
}
