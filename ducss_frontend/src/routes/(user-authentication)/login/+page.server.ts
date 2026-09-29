import { DB } from "$lib/server/database";
import { redirect, fail, type Actions } from "@sveltejs/kit";

export const actions = {
    login: async ({request, cookies}) => {
        const data = await request.formData();

        let email = data.get('email')?.toString();
        let password = data.get('password')?.toString();
        if (!email || email.trim() === '' || !password || password.trim() === '') {
            return fail(400, {message:'Please provide an email and password.'});
        }

        // Create user and get ID
        const sql = `SELECT * FROM auth.users WHERE lower(email) = lower($1)
                     AND hash_password = crypt($2, hash_password)`;
        const rows = await DB().query(sql, [email, password]);
        if (!rows[0]) {
            return fail(400, {message: 'Your username or password is incorrect.'});
        }
        const user_id: number = rows[0].id;

        // save session and get GUID
        const sessionSQL = `INSERT INTO auth.sessions (user_id, date_expired)
                            VALUES ($1, now() + interval '8 hour')
                            RETURNING id`;
        const sessionRows = await DB().query(sessionSQL, [user_id]);
        const sessionID = sessionRows[0].id;

        // Set cookie
        cookies.set('postgres', sessionID, {
            path: '/', // every page
            maxAge: 60 * 60 * 8 // 8 hours
        });

        redirect(303, '/profile');
    }
} satisfies Actions;