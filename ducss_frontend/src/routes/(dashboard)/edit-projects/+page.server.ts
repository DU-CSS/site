import { DB } from '$lib/server/database';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';
import { unlinkSync, write, writeFileSync } from 'node:fs';
import { redirect } from '@sveltejs/kit';
import { uploadProjectDemo, getSpacesPublicUrl } from '$lib/server/spaces';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.on_committee) {
        throw redirect(303, '/');
    }
    const projects = await DB().query(`SELECT * FROM comp.projects ORDER BY date_submitted DESC;`);
    const stages = await DB().query(`SELECT * FROM comp.project_stages;`);
    return {
        projects: projects.map(project => ({
            ...project,
            demo_URL: project.demo_path
                ? getSpacesPublicUrl(project.demo_path)
                : null
        })),
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
                console.log("PARAMKEY: " + paramKey);
                if (paramKey === 'demo_path') {
                    const demo = paramValue;
                    let demo_path: string | null = null;
                    if (demo instanceof File && demo.size > 0) {
                        if (demo.type !== 'video/mp4') {
                            return fail(400, {
                                success: false,
                                error: 'Please upload an MP4 video.'
                            });
                        }
                        if (demo.size > 250 * 1024 * 1024) {
                            return fail(400, {
                                success: false,
                                error: 'Video must be smaller than 250 MB.'
                            });
                        }
                        demo_path = await uploadProjectDemo(demo);
                    } 
                    paramKeys.push('demo_path');
                    paramValues.push(demo_path);
                    tags.push('$' + index++);
                } else if (paramKey !== 'id' && paramKey !== 'featured') {
                    paramKeys.push(paramKey);
                    paramValues.push(paramValue);
                    tags.push('$' + index++);
                    // e.g. paramValues = [title, content] tags = [$1, $2] and index = 3
                }
            }
            paramKeys.push('featured');
            paramValues.push(featured);
            tags.push('$' + index++);
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