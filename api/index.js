import server from '../dist/server/server.js';

export const config = {
  supportsResponseStreaming: true,
};

export default async function handler(req, res) {
  // 1. If Vercel successfully provided a Web Request object
  if (typeof req.text === 'function') {
    const url = new URL(req.url, `https://${req.headers.get('host') || 'localhost'}`);
    const originalPath = url.searchParams.get('_path') || '';
    url.searchParams.delete('_path');
    const originalUrl = new URL('/' + originalPath + url.search, url.origin);
    const newRequest = new Request(originalUrl.href, req);
    return server.fetch(newRequest);
  }

  // 2. If Vercel provided a Node.js IncomingMessage (fallback adapter)
  const host = req.headers.host || 'localhost';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  
  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `${protocol}://${host}`);
  } catch (e) {
    parsedUrl = new URL('/', `${protocol}://${host}`);
  }

  const originalPath = parsedUrl.searchParams.get('_path') || '';
  parsedUrl.searchParams.delete('_path');
  const originalUrl = new URL('/' + originalPath + parsedUrl.search, parsedUrl.origin);

  const webHeaders = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach(v => webHeaders.append(key, v));
    } else {
      webHeaders.set(key, value);
    }
  }

  let body = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    body = Buffer.concat(buffers);
  }

  const webRequest = new Request(originalUrl.href, {
    method: req.method,
    headers: webHeaders,
    body,
  });

  try {
    const webResponse = await server.fetch(webRequest);

    res.statusCode = webResponse.status;
    res.statusMessage = webResponse.statusText;
    
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end();
    }
  } catch (err) {
    console.error("SSR Handler Error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
