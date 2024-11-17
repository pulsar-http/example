import { start, router, json } from "@pulsar-http/core";

const routes = [
  router.get("/", async () => {
    return json({ message: "Hello, world!" });
  }),
];

start<{
  username: string;
}>({
  routes,
  websocket: {
    open(ws) {
      ws.send("Welcome to the chat!");

      ws.subscribe("chat");
      ws.publish("chat", `${ws.data?.username ?? "Someone"} joined the chat!`);
    },
    message(ws, message) {
      const user = ws.data?.username ?? "Someone";
      const text = `${user}: ${message}`;

      console.log(text);

      // Send to the current user
      ws.send(text);

      // Send to all other users
      ws.publish("chat", text);
    },
    close(ws) {
      ws.publish("chat", `${ws.data?.username ?? "Someone"} left the chat!`);
    },
    options: {
      upgrade: async (req) => {
        const url = new URL(req.url);
        const username = url.searchParams.get("username");
        return {
          data: {
            username,
          },
        };
      },
    },
  },
});
