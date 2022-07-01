export type RegexRedirectCallback = (req: Request) => Promise<Response>;

export class RegexRedirects {
    #stack: Map<RegExp, RegexRedirectCallback>;

    constructor() {
        this.#stack = new Map();
    }

    add(re: RegExp, callback: any) {
        this.#stack.set(re, callback);
    }

    match(pathname: string) {
        for (const re of this.#stack.keys()) {
            if (re.test(pathname)) {
                return this.#stack.get(re);
            }
        }
        return false;
    }
}

export type RedirectDefaultOptions = { headers?: any, status: number };

export function redirectDefault(url: string, options?: RedirectDefaultOptions) {
    const html = `<HTML><HEAD>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>Redirecting</TITLE>
<META HTTP-EQUIV="refresh" content="1; url=${url}">
</HEAD>
<BODY onLoad="location.replace('${url}'+document.location.hash)">
Redirecting you to ${url}</BODY></HTML>`;

    return new Response(html, {
        status: options?.status || 307,
        headers: new Headers({
            location: url,
            ...options?.headers
        }),
    });
}

export const regexRedirects = new RegexRedirects();
