import { DB } from "$lib/server/database";
import { type RequestHandler, redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) => {
    const session = cookies.get('postgres');
    if (session) {
        await DB().query(`UPDATE auth.sessions SET date_expired = now() WHERE id = $1`, [session]);
    }

    cookies.delete('postgres', { // needs to have the same settings or the delete won't work
        path: '/', // every page
        maxAge: 60 * 60 * 8 // 8 hours
    });

    throw redirect(303, '/');
}