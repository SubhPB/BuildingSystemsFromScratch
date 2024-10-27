// Byimaan

import * as net from "net"; // Need TCP protocol to setup http server.

const PORT = parseInt(process.env.PORT || "4221"),
    HOST_NAME = process.env.HOST_NAME || "localhost"

const server = net.createServer(
    (socket) => {
        console.log("Client connected!");
        socket.on('data', (data) => {
            console.log("Server has received a request")
            socket.write(
                Uint8Array.from(
                    Buffer.from(`HTTP/1.1 200 OK\r\nDeveloper: Byimaan\r\n\r\nTesting HTTP built over TCP protocol`)
                )
            )
            socket.end();
        });
    }
);

console.log(`TCP server is running at PORT:${PORT} with HOSTNAME:${HOST_NAME}`);

server.listen(PORT, HOST_NAME);
server.on("error", (error) => {
    console.log("Error occurred ", error.message)
});
