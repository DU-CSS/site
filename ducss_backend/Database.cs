using Npgsql;

namespace Ducss
{
    public static class Database
    {
        private static readonly string ConnectionString =
            new NpgsqlConnectionStringBuilder
            {
                Host = Environment.GetEnvironmentVariable("SECRET_PGHOST"),
                Port = int.Parse(Environment.GetEnvironmentVariable("SECRET_PGPORT")!),
                Username = Environment.GetEnvironmentVariable("SECRET_PGUSER"),
                Password = Environment.GetEnvironmentVariable("SECRET_PGPASSWORD"),
                Database = Environment.GetEnvironmentVariable("SECRET_PGDATABASE"),
                SslMode = SslMode.Require
            }.ConnectionString;

        public static NpgsqlConnection CreateConnection()
        {
            return new NpgsqlConnection(ConnectionString);
        }
    }
}