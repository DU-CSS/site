using Npgsql;

namespace Ducss
{
    public static class Database
    {
        private static string GetRequiredEnvironmentVariable(string name)
        {
            return Environment.GetEnvironmentVariable(name)
                ?? throw new InvalidOperationException(
                    $"Missing env variable: {name}"
                );
        }

        private static readonly string ConnectionString =
            new NpgsqlConnectionStringBuilder
            {
                Host = GetRequiredEnvironmentVariable("SECRET_PGHOST"),
                Port = int.Parse(
                    GetRequiredEnvironmentVariable("SECRET_PGPORT")
                ),
                Username = GetRequiredEnvironmentVariable("SECRET_PGUSER"),
                Password = GetRequiredEnvironmentVariable("SECRET_PGPASSWORD"),
                Database = GetRequiredEnvironmentVariable("SECRET_PGDATABASE"),

                SslMode =
                    GetRequiredEnvironmentVariable("SECRET_PGSSLMODE") == "require"
                        ? SslMode.Require
                        : SslMode.Disable,

                TrustServerCertificate = true,

                Timeout = 5,
                Pooling = true
            }.ConnectionString;

        public static NpgsqlConnection CreateConnection()
        {
            return new NpgsqlConnection(ConnectionString);
        }
    }
}