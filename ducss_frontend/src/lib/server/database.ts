import { env } from '$env/dynamic/private';
import { Pool, type PoolClient } from "pg";
import { readFileSync } from 'fs';
import { google } from 'googleapis';

// Create one PostgreSQL connection pool
// The pool manages individual database connections automatically
const pool = new Pool({
    host: env.SECRET_PGHOST,
    user: env.SECRET_PGUSER,
    password: env.SECRET_PGPASSWORD,
    database: env.SECRET_PGDATABASE,
    port: Number(env.SECRET_PGPORT),
    /*ssl: {
        rejectUnauthorized: true,
        ca: readFileSync(SECRET_PGSSLROOTCERT, 'utf8')
    },*/
    // Stop waiting if a database connection cannot be established.
    connectionTimeoutMillis: 5000,
    // Close idle connections after 15 seconds.
    idleTimeoutMillis: 15000
});

// Run a normal database query
export const DB = () => {
    return {
        query: async (sql: string, parameters: unknown[] = []) => {
            try {
                const result = await pool.query(sql, parameters);
                return result.rows;
            } catch (error) {
                console.error('Database query failed: ', error);
                throw new Error('Unable to query database.');
            }
        }
    };
};

// Run multiple queries as a single transaction
export const transaction = async <T>(
    callback: (client: PoolClient) => Promise<T>
): Promise<T> => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Database transaction failed: ', error);
        throw new Error('Unable to complete database transaction.');
    } finally {
        client.release();
    }
};

// Get DUCSS member info or return null if not a member
export async function findMemberByEmail(email: string) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: env.GOOGLESHEETS_CLIENTEMAIL,
            private_key: env.GOOGLESHEETS_PRIVATEKEY.replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    const sheets = google.sheets({
        version: 'v4',
        auth
    });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: env.GOOGLESHEETS_MEMBERSSHEETID,
        range: 'Sheet1!A:E'
    });
    const rows: string[][] = response.data.values ?? [];
    const matchingRow = rows.slice(1).find(
        (row) =>
            row[1]?.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (!matchingRow) {
        return null;
    }
    return {
        date: matchingRow[0] ?? '',
        email: matchingRow[1] ?? '',
        firstName: matchingRow[2] ?? '',
        lastName: matchingRow[3] ?? '',
        transactionId: matchingRow[4] ?? ''
    };
}

// Check if member is on committee
export async function isOnCommittee(email: string) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: env.GOOGLESHEETS_CLIENTEMAIL,
            private_key: env.GOOGLESHEETS_PRIVATEKEY.replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    const sheets = google.sheets({
        version: 'v4',
        auth
    });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: env.GOOGLESHEETS_COMMITTEESHEETID,
        range: 'Sheet1!A:C'
    });
    const rows: string[][] = response.data.values ?? [];
    // Ignore header (first row, index 0) so rows.slice(1)
    const matchingRow = rows.slice(1).find(
        (row) =>
            // Email is third column (index 2) so row[2]
            row[2]?.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (matchingRow) {
        return true;
    } else return false;
}