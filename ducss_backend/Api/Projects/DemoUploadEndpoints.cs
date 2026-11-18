using Ducss;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace Ducss.Api.Projects;

public static class DemoUploadEndpoints
{
    private static readonly HttpClient client = new HttpClient();

    public static void MapDemoUploadEndpoints(this WebApplication app)
    {
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

            // 3. Forward to Google Apps Script
            try
            {
                string? scriptUrl =
                    Environment.GetEnvironmentVariable("DEMO_UPLOAD_URL");

                if (string.IsNullOrWhiteSpace(scriptUrl))
                    return Results.Problem(
                        "Demo upload URL is not configured."
                    );

                // Read file
                using var memoryStream = new MemoryStream();
                await demo.CopyToAsync(memoryStream);
                byte[] fileBytes = memoryStream.ToArray();

                // Basic MP4 signature validation
                if (fileBytes.Length < 8 ||
                    Encoding.ASCII.GetString(fileBytes, 4, 4) != "ftyp")
                {
                    return Results.BadRequest("Invalid MP4 file.");
                }

                string base64 = Convert.ToBase64String(fileBytes);

                // Prepare filename
                string filename = Path.GetFileName(title.Trim());
                if (!filename.EndsWith(
                    ".mp4",
                    StringComparison.OrdinalIgnoreCase))
                {
                    filename += ".mp4";
                }

                // Prepare query parameters
                var query = await new FormUrlEncodedContent(
                    new Dictionary<string, string>
                    {
                        ["filename"] = filename,
                        ["mimeType"] = "video/mp4",
                        ["year"] = year.ToString(),
                        ["key"] = expectedSecret
                    }
                ).ReadAsStringAsync();
                var url = $"{scriptUrl}?{query}";

                // Send Base64 data
                using var content = new StringContent(
                    base64,
                    Encoding.UTF8,
                    "text/plain"
                );
                var response = await client.PostAsync(url, content);
                var result = await response.Content.ReadAsStringAsync();
                if (!response.IsSuccessStatusCode)
                    return Results.Problem(
                        "Google Apps Script upload failed."
                    );

                // Check Apps Script response
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
        }).DisableAntiforgery();
    }
}
