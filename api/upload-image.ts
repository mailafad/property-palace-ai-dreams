import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const R2_ENDPOINT = "https://f03575aba5adc8b38d5d4c3a14e1a3d8.r2.cloudflarestorage.com";
const R2_ACCESS_KEY_ID = "e58a6a28d82e3cf184423f2c1dde1aa7";
const R2_SECRET_ACCESS_KEY = "bc44bf27a3ea398545d08b6e12c048ce429fea5a985027102a5dba4002ec8b1c";
const R2_BUCKET = "adrealestates";
const R2_PUBLIC_URL = "https://pub-1c1af3c130fa48289cdc911af4e9c00f.r2.dev"; // e.g. https://accountid.r2.cloudflarestorage.com/bucket/

export const config = {
  runtime: 'nodejs',
  maxDuration: 15,
};

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.startsWith('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), { status: 400 });
    }

    // Read the form data as a buffer
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `${Date.now()}_${file.name}`;

    await s3.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
    }));

    const publicUrl = `${R2_PUBLIC_URL}/${key}`;
    return new Response(JSON.stringify({ url: publicUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('Upload error:', e);
    return new Response(JSON.stringify({ error: 'Upload failed', details: e instanceof Error ? e.message : String(e) }), { status: 500 });
  }
}