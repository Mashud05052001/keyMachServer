import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from "http";

const port = config.port || 5000;
let server: Server;

async function run() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(port, () =>
      console.log(`The server is running on ${port} port 🔥🔥`)
    );
  } catch (err) {
    console.log("Error found in mongoose connection time 💀💀");
  }
}

run();

process.on("unhandledRejection", () => {
  console.log("💀 Unhelded Rejection is detected, Shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("uncaughtException", () => {
  console.log("💀 Uncaught Exception is detected, Shutting down...");
  process.exit(1);
});
