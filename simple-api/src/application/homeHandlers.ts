import { html, getSession, type RouterHandler } from "@pulsar-http/core";

export const handleGetHome: RouterHandler = async ({ request }) => {
    const session = await getSession(request);

    if (!session?.user) {
        return html(`
            <h1>Hello, guest!</h1>
            <p>You are not logged in.</p>
            <a href="/auth/signin">Login</a>
        `);
    }

    return html(`
        <h1>Hello, ${session.user.name}!</h1>
        <p>You are logged in.</p>
        <a href="/auth/signout">Logout</a>
    `)
}
