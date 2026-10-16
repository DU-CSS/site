import type {LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals}) => {
    return {
        id: locals.id,
        first_name: locals.first_name,
        last_name: locals.last_name,
        on_committee: locals.on_committee,
        is_exec: locals.is_exec
    };
};