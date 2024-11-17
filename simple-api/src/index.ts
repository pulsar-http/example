import { start } from '@pulsar-http/core';
import { routes } from './application/routes';
import { getClient } from "./adapters/db";
import { middlewares } from "./application/middlewares";

(async () => {
    try {
        await getClient().connect();
        start({ routes, middlewares });
    } catch (e) {
        console.error(e);
    }
})();
