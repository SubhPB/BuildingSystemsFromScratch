// Byimaan

import fs from "fs";
import { Server } from "./server";
import path from "path";
import { spacer } from "./utils";
import { HandleFiles } from "./routes/files";

const PORT = parseInt(process.env.PORT || "4221"),
    HOST_NAME = process.env.HOST_NAME || "localhost"

const server = new Server();

server.get("/", ( _ , res) => {
    res.setHeader("ENV", "TEST").status(200, "OK").end("Test Passed!");
});

// GOAL: Learn to send requested `/files/{fileName}` in a chunked manner to user using raw TCP into HTTP 
server.get("/files*", HandleFiles)

console.log(`TCP server is running at PORT:${PORT} with HOSTNAME:${HOST_NAME}`);
server.listen(PORT, HOST_NAME);