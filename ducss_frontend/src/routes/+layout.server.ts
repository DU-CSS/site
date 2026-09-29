import type {LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals}) => {
    return {
        email: locals.email,
        role: locals.role,
        first_name: locals.first_name,
        last_name: locals.last_name
    };
};