import { DB } from '$lib/server/database';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../edit-site/$types';
import { dev } from '$app/environment';
import { unlinkSync, writeFileSync } from 'node:fs';

export const load: PageServerLoad = async () => {
    const projects = await DB().query(`SELECT * FROM comp.projects ORDER BY date_submitted DESC;`);
    const stages = await DB().query(`SELECT * FROM comp.project_stages;`);
    return {
        projects,
        stages
    };
}

// Default stage is 'Unstaged'
// If it is month after date_submitted:
// If stage is 'Staged' -> 'Published'

export const actions = {
    save: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        const featured = form.has('featured');
        if (!id || Number(id) < 0) {
            return {
                success: false,
                error: 'Not a valid project ID'
            }
        }

        if (Number(id) > 0) {
            // Submitted an edited version of existing project i.e. ID > 0
            const stage_id = form.get('stage_id');
            // FormData handling of checkbox learned below
            // https://stackoverflow.com/questions/33487360/formdata-and-checkboxes
            let sql = `UPDATE comp.projects SET stage_id = $1, featured = $2 WHERE id = $3;`;
            await DB().query(sql, [stage_id, featured, id]);
        } else {
            // Submitted a new project i.e. ID = 0
            let index = 1;
            let tags = [];
            let paramKeys = [];
            let paramValues = [];
            for (const [paramKey, paramValue] of form.entries()) {
                if (paramKey !== 'id' && paramKey !== 'featured') {
                    paramKeys.push(paramKey);
                    paramValues.push(paramValue);
                    tags.push('$' + index++);
                    // e.g. paramValues = [title, content] tags = [$1, $2] and index = 3
                }
            }
            let sql = `INSERT INTO comp.projects (${paramKeys.toString()}) `; // e.g. INSERT INTO events.events (title, content) 
            sql += `VALUES (${tags.toString()}) RETURNING id`; // e.g. VALUES ($1, $2) RETURNING id
            console.log('sql: ' + sql);
            console.log('values: ' + paramValues);
            const new_project = await DB().query(sql, paramValues); // e.g. paramValues = [title, content]
        }
        return {
            success: true
        };
    },
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        if (!id || Number(id) <= 0) {
            return {
                success: false,
                error: 'Not a valid project ID'
            }
        }
        const sql = `DELETE FROM comp.projects WHERE id = $1`;
        const deleted_project = await DB().query(sql, [id]);
        console.log(`DELETED PROJECT WITH ID = ${id}`);
        return {
            success: true
        }
    }
} satisfies Actions;