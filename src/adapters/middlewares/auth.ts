import { authMiddleware, githubAuthProvider } from "@pulsar-http/core";

export const auth = authMiddleware({
    providers: [
        githubAuthProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
    ]
});