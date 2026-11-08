using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using Ducss;
using Npgsql;
using NpgsqlTypes;

namespace Ducss.Api.Members;

public static class MemberSyncEndpoints
{
    public static void MapMemberSyncEndpoints(this WebApplication app)
    {
        app.MapPost("/api/members-sync", async (
            MemberSyncRequest request,
            HttpRequest httpRequest
        ) =>
        {
            // 1. Authenticate request
            string? expectedSecret =
                Environment.GetEnvironmentVariable("MEMBER_SYNC_KEY");

            string? suppliedSecret =
                httpRequest.Headers["X-Sync-Secret"].FirstOrDefault();

            if (string.IsNullOrWhiteSpace(expectedSecret))
            {
                return Results.Problem(
                    "API authentication is not configured."
                );
            }

            if (string.IsNullOrEmpty(suppliedSecret) ||
                !CryptographicOperations.FixedTimeEquals(
                    Encoding.UTF8.GetBytes(expectedSecret),
                    Encoding.UTF8.GetBytes(suppliedSecret)))
            {
                return Results.Unauthorized();
            }

            // 2. Validate request
            if (request.Members == null ||
                request.Members.Count == 0 ||
                request.Members.Count > 1000)
            {
                return Results.BadRequest(new
                {
                    message = "Request must contain between 1 and 1000 members."
                });
            }

            var emails = new HashSet<string>(
                StringComparer.OrdinalIgnoreCase
            );

            foreach (var member in request.Members)
            {
                if (string.IsNullOrWhiteSpace(member.FirstName) ||
                    string.IsNullOrWhiteSpace(member.LastName) ||
                    string.IsNullOrWhiteSpace(member.Email) ||
                    !MailAddress.TryCreate(member.Email, out var parsedEmail) ||
                    !parsedEmail.Address.Equals(
                        member.Email.Trim(),
                        StringComparison.OrdinalIgnoreCase))
                {
                    return Results.BadRequest(new
                    {
                        message = "1+ member records contain invalid data."
                    });
                }
            }

            // 3. Execute database operations
            try
            {
                await using var connection = Database.CreateConnection();
                await connection.OpenAsync();

                await using var transaction =
                    await connection.BeginTransactionAsync();

                const string sql = @"
                    INSERT INTO org.members AS current_member (
                        first_name,
                        last_name,
                        email,
                        date_joined
                    )
                    VALUES (
                        @firstName,
                        @lastName,
                        @email,
                        @dateJoined
                    )
                    ON CONFLICT (email)
                    DO UPDATE SET
                        first_name = EXCLUDED.first_name,
                        last_name = EXCLUDED.last_name,

                        date_joined = CASE
                            WHEN current_member.date_joined IS NULL
                            THEN EXCLUDED.date_joined
                            ELSE current_member.date_joined
                        END,

                        date_renewed = CASE
                            WHEN current_member.date_joined IS NOT NULL
                             AND EXCLUDED.date_joined
                                 IS DISTINCT FROM current_member.date_joined
                             AND EXCLUDED.date_joined
                                 IS DISTINCT FROM current_member.date_renewed
                            THEN EXCLUDED.date_joined
                            ELSE current_member.date_renewed
                        END

                    WHERE
                        current_member.first_name
                            IS DISTINCT FROM EXCLUDED.first_name
                        OR current_member.last_name
                            IS DISTINCT FROM EXCLUDED.last_name
                        OR (
                            current_member.date_joined IS NULL
                            AND EXCLUDED.date_joined IS NOT NULL
                        )
                        OR (
                            EXCLUDED.date_joined IS NOT NULL
                            AND EXCLUDED.date_joined
                                IS DISTINCT FROM current_member.date_joined
                            AND EXCLUDED.date_joined
                                IS DISTINCT FROM current_member.date_renewed
                        );
                ";

                foreach (var member in request.Members)
                {
                    await using var command =
                        new NpgsqlCommand(sql, connection, transaction);

                    command.Parameters.AddWithValue(
                        "firstName", member.FirstName.Trim());

                    command.Parameters.AddWithValue(
                        "lastName", member.LastName.Trim());

                    command.Parameters.AddWithValue(
                        "email", member.Email.Trim());

                    command.Parameters.Add(
                        "dateJoined", NpgsqlDbType.Date).Value =
                        member.DateJoined.HasValue
                            ? (object)member.DateJoined.Value
                            : DBNull.Value;

                    await command.ExecuteNonQueryAsync();
                }

                await transaction.CommitAsync();

                return Results.Ok(new
                {
                    success = true,
                    processed = request.Members.Count
                });
            }
            catch (Exception ex)
            {
                app.Logger.LogError(
                    ex,
                    "Membership synchronisation failed."
                );

                return Results.Problem(
                    "Membership synchronisation failed."
                );
            }
        });
    }
}