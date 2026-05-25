import server from '../dist/server/server.js';

export default async function handler(request) {
  // Pass the web Request to the TanStack Start server fetch handler
  return server.fetch(request);
}
