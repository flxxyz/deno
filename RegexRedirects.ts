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
