// ! TEMPORARY
// ! open API to the listed validDomains
// ! delete/update when introducing API keys
// ? https://snippets.khromov.se/configure-cors-in-sveltekit-to-access-your-api-routes-from-a-different-host/

export async function handle({ resolve, event }) {
  const validDomains = /^(.*)?\.?emnific\.com$/;
  let cors = false;

  // Apply CORS header for API routes
  if (event.url.pathname.startsWith('/api')) {
    let originDomain = null;
    try {
      originDomain = new URL(event.request.headers.get('origin') || '').hostname;
      if(validDomains.test(originDomain)) {   
        cors = `https://${originDomain}`
      }
    } catch (e) {
      console.log('Invalid origin', e);
    }

    // Required for CORS to work
    if(event.request.method === 'OPTIONS' && cors) {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': cors,
          'Access-Control-Allow-Headers': '*',
        }
      });
    }
  }

  const response = await resolve(event);
  if (event.url.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', cors);
  }
  return response;
};
