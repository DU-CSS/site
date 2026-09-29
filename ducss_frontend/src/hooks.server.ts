import { DB } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    const guid_id = event.cookies.get('postgres');
    if (guid_id) {
        const sql = `SELECT u.email, u.role, u.first_name, u.last_name FROM auth.sessions AS s
                     JOIN auth.users AS u ON s.user_id = u.id
                     WHERE s.id = $1`
        const rows = await DB().query(sql, [guid_id]);
        if (rows[0]) {
            event.locals.email = rows[0].email;
            event.locals.role = rows[0].role;
            event.locals.first_name = rows[0].first_name,
            event.locals.last_name = rows[0].last_name
        }
    }

    // URL path checks
    if (event.url.pathname === '/login' && event.locals.email) {
        throw redirect(303, '/');
    }
    if (event.url.pathname === '/profile' && !event.locals.email) {
        throw redirect(303, '/');
    }
    if (event.url.pathname === '/edit-site' && event.locals.role !== 'committee') {
        throw redirect(303, '/login');
    }
    return await resolve(event);
}