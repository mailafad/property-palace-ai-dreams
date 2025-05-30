import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../src/integrations/supabase/client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    res.status(400).send('Missing property ID');
    return;
  }

  // Fetch property from Supabase
  const { data: property, error } = await supabase
    .from('properties')
    .select('id,title,description,images')
    .eq('id', id)
    .single();

  if (error || !property) {
    res.status(404).send('Property not found');
    return;
  }

  const image = Array.isArray(property.images) && property.images.length > 0
    ? property.images[0]
    : 'https://www.adrealestates.in/default-image.jpg';

  const redirectUrl = `https://www.adrealestates.in/property/${property.id}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${property.title}</title>
      <meta property="og:title" content="${property.title}" />
      <meta property="og:description" content="${property.description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:url" content="${redirectUrl}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${property.title}" />
      <meta name="twitter:description" content="${property.description}" />
      <meta name="twitter:image" content="${image}" />
      <meta http-equiv="refresh" content="0; url=${redirectUrl}" />
    </head>
    <body>
      <p>Redirecting to property page...</p>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}