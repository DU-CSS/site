import { DB } from '$lib/server/database';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';
import { unlinkSync, writeFileSync } from 'node:fs';

export const load: PageServerLoad = async () => {
    const categories = await DB().query(`SELECT * FROM events.categories ORDER BY content`);
    const events = await DB().query(`SELECT * FROM events.events ORDER BY start_date DESC`);
    return {
        events,
        categories
    };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        // Event parameter [key, isRequired]
        const paramKeys: [string, boolean][] = [
            ['title', true],
            ['content', true],
            ['location', true],
            ['ticketed', false],
            ['start_date', true],
            ['start_time', true],
            ['end_date', true],
            ['end_time', true]
        ];
        const params: Record<string, FormDataEntryValue> = {};
        for (const [key, isRequired] of paramKeys) {
            const paramValue = data.get(key);
            if (isRequired && (!paramValue || paramValue === '')) {
                return fail(400, { message: `Please provide the ${key} for the event.` });
            }
            if (paramValue !== null) {
                params[key] = paramValue;
            } else if (key === 'ticketed') {
                params[key] = 'off';
            }
            // Can now access params.title, params.content etc.
        }

        let id = data.get('id');
        let category_id = data.get('category_id');
        if (!category_id || category_id === '') {
            return fail(400, { message: `Please choose a category for the event.` });
        }

        if (Number(id) > 0) {
            // Editing existing post i.e. ID > 0
            for (const [paramKey, paramValue] of Object.entries(params)) {
                if (!(paramKey === 'id')) {
                    let sql = `UPDATE data.events SET ${paramKey} = $1 WHERE id = $2`;
                    await DB().query(sql, [paramValue, id]);
                    // e.g. UPDATE data.events SET title = 'Example' WHERE id = [params.id]
                }
            }
        } else {
            // Editing new post i.e. ID = 0
            let index = 1;
            let tags = [];
            let paramValues = [];
            for (const [paramKey, paramValue] of Object.entries(params)) {
                if (!(paramKey === 'id')) {
                    paramValues.push(paramValue);
                    tags.push('$' + index++); // e.g. paramValues = [title, content] tags = [$1, $2] and index = 3
                }
            }
            const keysOnly = [];
            for (const [key, isRequired] of paramKeys) {
                keysOnly.push(key);
            }
            let sql = `INSERT INTO events.events (${keysOnly.toString()}) `; // e.g. INSERT INTO events.events (title, content) 
            sql += `VALUES (${tags.toString()}) RETURNING id`; // e.g. VALUES ($1, $2) RETURNING id
            console.log('sql: ' + sql);
            console.log('values: ' + paramValues);
            const new_events = await DB().query(sql, paramValues); // e.g. paramValues = [title, content]
            id = new_events[0].id;
        }

        return {
            success: true
        };
    }
} satisfies Actions;