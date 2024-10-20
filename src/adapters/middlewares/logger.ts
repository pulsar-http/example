import { log, type Middleware } from "@pulsar-http/core";

export const logger: Middleware = async (request, next) => {
    const method = request.method;
    const url = new URL(request.url).pathname;

    const response = await next();
    const status = response.status;

    if (status >= 200 && status < 300) {
        log(`\x1b[32m${method} ${url} => ${status}\x1b[0m`);
    } else if (status >= 400 && status < 500) {
        log(`\x1b[33m${method} ${url} => ${status}\x1b[0m`);
    } else if (status >= 500) {
        log(`\x1b[31m${method} ${url} => ${status}\x1b[0m`);
    }

    return response;
}