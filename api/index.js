import server from '../dist/server/server.js';

export const config = {
  supportsResponseStreaming: true,
};

export default async function handler(request) {
  const url = new URL(request.url);
  
  // Extract the original path passed by the rewrite
  const originalPath = url.searchParams.get('_path') || '';
  url.searchParams.delete('_path');
  
  // Reconstruct the original URL requested by the user
  const originalUrl = new URL('/' + originalPath + url.search, request.url);
  
  // Create a new Request with the reconstructed URL
  const newRequest = new Request(originalUrl.href, request);
  
  return server.fetch(newRequest);
}
