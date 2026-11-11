import {dev} from "$app/environment";
import { error } from "@sveltejs/kit";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const GET = async ({ params }) => {
    const videoName = path.basename(params.slug);
    const directory = dev ? 'C:/temp/' : '/var/www/html/files/';

    try {
        const video = await readFile(path.join(directory,videoName));
        return new Response(video, {
            headers: {
                "Content-Type": "video/mp4",
                "Content-Disposition": "inline"
            }
        });
    } catch {
        throw error(404, "Facing issue reading demo file.")
    }
}