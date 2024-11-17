import { authMiddleware } from "@pulsar-http/core";
import githubAuthProvider from '@auth/core/providers/github';

export const auth = authMiddleware({
    providers: [
        githubAuthProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
    ]
});