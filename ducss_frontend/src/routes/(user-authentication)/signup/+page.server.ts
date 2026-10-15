import { GOOGLE_APIKEY, GOOGLE_CLIENTID } from "$env/static/private";
import { DB, isUser, isOnCommittee } from "$lib/server/database";
import { redirect, fail, type Actions } from "@sveltejs/kit";

export const actions = {
    create: async ({ request, cookies }) => {
        const data = await request.formData();
        let email = data.get('email')?.toString();
        let password = data.get('password')?.toString();
        const confirmPassword = data.get('confirm-password')?.toString();

        if (password != confirmPassword) {
            return fail(400, { message: 'The passwords do not match.' });
        }
        if (!email || email.trim() === '' || !password || password.trim() === '') {
            return fail(400, { message: 'Please provide an email and password.' });
        }
        
        const memberCheckSQL = `SELECT EXISTS (SELECT 1 FROM org.members WHERE email = $1) AS exists;`;
        const memberCheckRows = await DB().query(memberCheckSQL, [email]);
        const member = memberCheckRows[0];
        if (member.exists) {
            if (await isUser(member.id)) {
                return fail(400, { message: 'That email already has a DUCSS account.' });
            }
            
            // Create user and get ID
            const sql = `INSERT INTO auth.users (id, hash_password)
                         VALUES ($1, crypt($2, gen_salt('bf', 8)))
                         RETURNING *`;
            const rows = await DB().query(sql, [member.id, password]);

            // save session and get session ID
            const sessionSQL = `INSERT INTO auth.sessions (user_id, date_expired)
                                VALUES ($1, now() + interval '8 hour')
                                RETURNING id`;
            const sessionRows = await DB().query(sessionSQL, [member.id]);
            const sessionID = sessionRows[0].id;

            // Set cookie
            cookies.set('postgres', sessionID, {
                path: '/', // every page
                maxAge: 60 * 60 * 8 // 8 hours
            });

            redirect(303, '/profile');
        } else {
            return fail(400, { message: 'This email does not seem to have a 2026/27 DUCSS membership.' });
        }
    }
} satisfies Actions;