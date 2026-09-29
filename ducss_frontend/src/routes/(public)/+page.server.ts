import { DB } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const categories = await DB().query(`SELECT * FROM events.categories ORDER BY content`);
    const events = await DB().query(`SELECT * FROM events.events ORDER BY start_date DESC`);
    return {
        events,
        categories
    };
}