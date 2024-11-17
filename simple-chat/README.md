### Simple websocket chat example with Pulsar

This example demonstrates how to build a simple chat application using Pulsar Functions and Websockets.

The purpose is just to show that it works, so it's a very simple example. It's not production ready.

#### Run the application

1. Start the frontend (react)

```bash
cd simple-chat/front-end
bun dev
```

2. Start the backend (pulsar)

```bash
cd simple-chat/back-end
bun --watch index.ts
```

3. Open your browser at `http://localhost:5173`