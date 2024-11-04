# 🚀 Own HTTP Server (in TypeScript)

Welcome to the **Own HTTP Server** project! This is a custom-built HTTP server implemented entirely from scratch using TypeScript, leveraging only the bare-bones functionality of `net.Server` to create a foundational HTTP server over a TCP connection.

## 📖 What I Learned

Building an HTTP server from scratch has provided me with hands-on experience and a deeper understanding of how HTTP protocol functions at the core. Here’s a summary of my key takeaways:

1. **Foundations of HTTP Protocol**: I now understand the intricacies of the HTTP protocol, including how requests and responses are constructed, transmitted, and handled over TCP. This foundational knowledge bridges the gap between high-level frameworks and the protocol's raw workings.
  
2. **Frameworks Under the Hood**: With a clearer understanding of what frameworks like Express and Fastify do behind the scenes, I’m now able to appreciate and even recreate fundamental backend features that power modern applications.

3. **Data Transmission Techniques**: By working directly with data buffers and encoding (UTF-8), I’ve learned how different data types are encoded, decoded, and transferred seamlessly across network connections, a skill applicable beyond HTTP.

4. **Chunked Data Transfer**: Implementing chunked data transfer taught me how large data payloads can be divided and sent over HTTP. This approach is crucial for handling streaming content or handling large files efficiently.

5. **Request Parsing and Response Building**: I’ve gained confidence in parsing HTTP requests directly from raw strings—breaking down the request line, headers, and body—and constructing responses with the correct status line, headers, and body format. This has demystified each component in HTTP requests and responses.

6. **TCP Server Fundamentals**: Working with `net.Server` has enhanced my understanding of TCP connections and how data is received and processed at the socket level, making it clear how higher-level HTTP servers build on these basic constructs.

## 🌱 Skill Development and Growth

Through this project, I’ve achieved a major shift from building applications using ready-made tools to understanding how these tools are engineered. Here’s how this project has impacted my development journey:

- **Engineering Mindset**: I now approach problems with an engineering mindset, not just focusing on how to use tools but on how to build them from the ground up.
- **Questioning and Curiosity**: This project has fueled my curiosity, driving me to ask deeper questions about how systems work. This has made me a more effective problem solver and a more inquisitive developer.
- **Foundation for Backend Frameworks**: With the knowledge gained here, I feel equipped with the foundation needed to design and implement my own backend framework if needed, building upon the HTTP server core I created.
  
## 💡 Highlights of My HTTP Server Implementation

- **Built using TypeScript** for strong typing and enhanced development experience.
- **Powered by `net.Server`** to handle TCP connections directly, bypassing higher-level abstractions.
- **Manual Request Parsing**: I parse the request line, headers, and body manually, showcasing a deep understanding of HTTP’s structure.
- **Raw Response Construction**: My server constructs responses from scratch, including the status line, headers, and body.
- **Chunked Transfer Encoding**: Supports data transfer in chunks for handling larger or streaming data.

## 🔧 Technical Features

- **Request Parsing**: Parses request lines, headers, and bodies directly from the incoming data stream.
- **Buffer and UTF-8 Handling**: Effectively manages data encoding and decoding, handling various character encodings for flexibility.
- **Custom Response Handling**: Builds the full response, controlling headers, status codes, and data formats for precise client-server interaction.

## 🛠️ Project Structure

Here’s a basic overview of the structure of this project:

```plaintext
in-typescript/
├── src/
│   ├── server.ts          # Entry point for the HTTP server
│   ├── request/   # Parses incoming HTTP requests
│   ├── response/ # Constructs HTTP responses
|   ├── routes/ # Handle different routes/paths
│   └── utils/             # Helper utilities for buffer and encoding
|   ...  
└── README.md
```

