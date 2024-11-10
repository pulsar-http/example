import { swaggerMiddleware } from "@pulsar-http/core";

import { auth } from "../adapters/middlewares/auth";
import { logger } from "../adapters/middlewares/logger";
import { routes } from "../application/routes.ts";

export const middlewares = [
    swaggerMiddleware(routes),
    auth,
    logger,
]