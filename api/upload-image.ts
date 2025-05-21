import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const R2_ENDPOINT = "https://f03575aba5adc8b38d5d4c3a14e1a3d8.r2.cloudflarestorage.com";
const R2_ACCESS_KEY_ID = "e58a6a28d82e3cf184423f2c1dde1aa7";
const R2_SECRET_ACCESS_KEY = "bc44bf27a3ea398545d08b6e12c048ce429fea5a985027102a5dba4002ec8b1c";
const R2_BUCKET = "adrealestates";
const R2_PUBLIC_URL = "https://pub-1c1af3c130fa48289cdc911af4e9c00f.r2.dev"; // e.g. https://accountid.r2.cloudflarestorage.com/bucket/

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ error: 'Error parsing form data' });
      return;
    }
    const file = files.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const fs = await import('fs');
    const path = file.filepath || file.path;
    const fileStream = fs.createReadStream(path);
    const key = `${Date.now()}_${file.originalFilename || file.name}`;

    try {
      await s3.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: fileStream,
        ContentType: file.mimetype || 'application/octet-stream',
      }));
      const publicUrl = `${R2_PUBLIC_URL}/${key}`;
      res.status(200).json({ url: publicUrl });
    } catch (e) {
      console.error('Upload error:', e);
      res.status(500).json({ error: 'Upload failed', details: e instanceof Error ? e.message : e });
    }
  });
};

export default handler;