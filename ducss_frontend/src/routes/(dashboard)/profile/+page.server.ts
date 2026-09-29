import type {PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    return {
        email: locals.email,
        role: locals.role,
        first_name: locals.first_name,
        last_name: locals.last_name
    };
};