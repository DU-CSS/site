import { DB } from "$lib/server/database";
import { redirect, fail, type Actions } from "@sveltejs/kit";

export const actions = {
    change: async ({request, cookies}) => {
        const data = await request.formData();

        let password = data.get('password')?.toString();
        const confirmPassword = data.get('confirm-password')?.toString();
        const session_id = data.get('session_id')?.toString();

        if (password != confirmPassword) {
            return fail(400, {message:'The passwords do not match.'});
        }
        if (!password || password.trim() === '') {
            return fail(400, {message:'Please provide a password.'});
        }

        // check password change session_id
        const sql = `SELECT * FROM auth.password_resets WHERE session_id = $1 AND completed = false AND date_requested + interval '7 day' > now() `;
        const rows = await DB().query(sql, [session_id]);
        if (!rows[0]) {
            return fail(400, {message: 'Invalid link.'});
        }

        const user_id = rows[0].user_id;
        // update password
        await DB().query(`UPDATE auth.users SET hash_password = crypt($1, gen_salt('bf', 8)) WHERE id = $2`, [password, user_id]);

        // Mark completed so it cannot be used again
        await DB().query(`UPDATE auth.password_resets SET completed = true WHERE session_id = $1`, [session_id]);

        // save session and get session ID
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

        redirect(303, '/');
    }
} satisfies Actions;