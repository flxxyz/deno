import { readFile } from "https://deno.land/std@0.152.0/node/fs/promises.ts";
import { join, extname } from "https://deno.land/std@0.152.0/path/posix.ts";

export const DEFAULT_MIME_TYPE = 'application/octet-stream';

export const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.woff': 'application/x-font-woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
};

export const excludeMimeTypes = [
  '.map',
];

export async function ReadFileToResponse(url: string, dir: string) {
    let pathname = new URL(url).pathname;
    if (pathname === '/') {
      pathname = 'index.html';
    }
    const ext = extname(pathname);
    if (excludeMimeTypes.includes(ext)) {
      return new Response(null, {
        status: Status.NotFound,
      });
    }

    const mimeType = mimeTypes[ext] || DEFAULT_MIME_TYPE;
    const file = join(dir, pathname);
    const content = await readFile(file);
    return new Response(content, {
      headers: { "Content-Type": mimeType },
    });
}
