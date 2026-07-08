import http from "http";

import app from "./app.js";

import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

import { initializeSocket } from "./sockets/socket.js";
import { registerSocketEvents } from "./sockets/index.js";

async function bootstrap() {
  await connectDB();

  const httpServer = http.createServer(app);

  const io = initializeSocket(httpServer);

  registerSocketEvents(io);

  httpServer.listen(env.PORT, () => {
    console.log(
      `🚀 Server running on http://localhost:${env.PORT}`
    );
  });
}

bootstrap();