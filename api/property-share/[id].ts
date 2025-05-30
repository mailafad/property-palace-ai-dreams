import { supabase } from '../../src/integrations/supabase/client';

export const config = {
  runtime: 'edge',
};

export async function GET(request: Request) {
  // Extract property ID from URL
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return new Response('Missing property ID', { status: 400 });
  }

  // Fetch property from Supabase
  const { data: property, error } = await supabase
    .from('properties')
    .select('id,title,description,images')
    .eq('id', id)
    .single();

  if (error || !property) {
    return new Response('Property not found', { status: 404 });
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

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}