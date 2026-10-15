import { DB, isOnCommittee } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    const guid_id = event.cookies.get('postgres');
    if (guid_id) {
        const sql = `SELECT m.id, m.first_name, m.last_name
                    FROM auth.sessions AS s
                    JOIN org.members AS m ON s.user_id = m.id
                    WHERE s.id = $1`
        const rows = await DB().query(sql, [guid_id]);
        if (rows[0]) {
            event.locals.id = rows[0].id;
            event.locals.first_name = rows[0].first_name,
            event.locals.last_name = rows[0].last_name
        }
    }

    // URL path checks
    if (event.url.pathname === '/login' && event.locals.id) {
        throw redirect(303, '/');
    }
    if (event.url.pathname === '/profile' && !event.locals.id) {
        throw redirect(303, '/');
    }
    if (event.url.pathname === '/edit-site' && !(await isOnCommittee(event.locals.id))) {
        throw redirect(303, '/login');
    }
    return await resolve(event);
}