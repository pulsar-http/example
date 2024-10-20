import { getSession, error, type RouterHandler } from "@pulsar-http/core";

export const withAuth = <Body>(handler: RouterHandler<Body>): RouterHandler<Body> => {
    return async (...params) => {
        const session = await getSession(params[0]);

        if (!session?.user) {
            return error(401, 'You must be logged in to access this resource');
        }

        return handler(...params);
    };
};