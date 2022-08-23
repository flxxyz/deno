export default async function readFile(url: string, dir: string) {
    let pathname = new URL(url).pathname;
    if (pathname === '/') {
      pathname = 'index.html';
    }

    const ext = extname(pathname);
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.jpeg': 'image/jpg',
      '.svg': 'image/svg+xml',
      '.woff': 'application/x-font-woff',
      '.woff2': 'font/woff2',
    };
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    const file = join(dir, pathname);
    const content = await readFile(file);
    return new Response(content, {
      headers: { "Content-Type": mimeType },
    });
}
