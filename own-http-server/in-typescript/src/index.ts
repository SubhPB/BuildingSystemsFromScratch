// Byimaan

import { Server } from "./server";

const PORT = parseInt(process.env.PORT || "4221"),
    HOST_NAME = process.env.HOST_NAME || "localhost"

const server = new Server();

server.get("/", (req, res) => {
    res.setHeader("ENV", "TEST").status(200, "OK").end("Test Passed!");
})

console.log(`TCP server is running at PORT:${PORT} with HOSTNAME:${HOST_NAME}`);
server.listen(PORT, HOST_NAME);