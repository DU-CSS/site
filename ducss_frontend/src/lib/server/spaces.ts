import { env } from '$env/dynamic/private';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const region = env.SPACES_REGION;
const bucket = env.SPACES_BUCKET;
const accessKey = env.SPACES_KEY;
const secretKey = env.SPACES_SECRET;

if (!region || !bucket || !accessKey || !secretKey) {
    throw new Error('Missing environmental Spaces variables.')
}

const spaces = new S3Client({
    endpoint: `https://${region}.digitaloceanspaces.com`,
    region: 'us-east-1',
    forcePathStyle: false,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    }
});

export async function uploadProjectDemo(file: File): Promise<string> {
    const key = `projects/${crypto.randomUUID()}.mp4`;

    await spaces.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: 'video/mp4',
        CacheControl: 'public, max-age=31536000',
        ACL: 'public-read'
    }));

    return key;
}

export function getSpacesPublicUrl(key: string): string {
    return `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${key}`;
}