import { auth } from "../adapters/middlewares/auth.ts";
import { logger } from "../adapters/middlewares/logger.ts";

export const middlewares = [
    auth,
    logger
]