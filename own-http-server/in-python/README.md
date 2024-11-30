# HTTP Server in Python

This directory contains my implementation of an **HTTP server** written from scratch in Python. The purpose of this project is to deeply understand the inner workings of how web servers function, beyond simply using high-level libraries or frameworks.

---

## 📖 About This Project

This HTTP server is built to explore and reinforce foundational concepts of networking, HTTP protocols, and client-server interactions. By developing this server, I have gained hands-on experience with:

1. **Socket Programming**: Learning how to create, bind, listen, and accept connections using Python's `socket` module.
2. **HTTP Protocol**: Implementing core HTTP methods like `GET` and `POST`, and crafting structured HTTP responses manually.
3. **Request Handling**: Parsing incoming requests, handling headers, and dynamically serving content.

This project represents the result of my **hard work and determination** to understand systems programming and low-level server-side fundamentals.

---

## 🌱 What I Learned
**A concrete foundation and deeper insight of building backend frameworks**

1. **Network Programming Basics**:
   - How sockets facilitate communication between a client and server.
   - The lifecycle of a server from binding to accepting client connections.
2. **HTTP Essentials**:
   - HTTP from a engineer's perspective 
   - Handling requests synchronously and processing data sent by clients.
3. **Debugging Skills**:
   - Learning how to troubleshoot server issues, such as connection handling errors and malformed requests.

---

## 🔧 Implementation Details

This server was implemented with minimal dependencies, focusing on Python's built-in modules like `socket`. Here’s a brief overview of its capabilities:
- **Serve Static Content**: Handles requests to serve basic HTML files.
- **Dynamic Routes**: Ability to respond to dynamic routes or endpoints.
- **Custom Error Handling**: Sends appropriate HTTP status codes (e.g., `404 Not Found`).

---

## Project Structure

```plaintext
in-python/
│
├── http_server.py          # Core implementation of the HTTP server.
├── README.md               # This file.
├── static/                 # Directory containing static files to be served.
└── tests/
    ├── test_http_server.py # Unit tests for server functionality.
    └── ...
