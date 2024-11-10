# Byimaan

# Byimaan

import socket

class Server:
    def __init__(self, host: str, port: int) -> None:
        self._host = host
        self._port = port
        self._server_socket = socket.socket(
            socket.AF_INET, # Address-family = Internet; Use IPv4; AF_INET6 for TPv6
            socket.SOCK_STREAM # Socket type should be stream which is typical for TCP connections
        )
        self.server_is_running = False
        
    def start(self):
        self._server_socket.bind(
           (self._host, self._port)
        )
        self._server_socket.listen()

        print(f"\r\n [INFO:Start] HTTP server is now listening on {self._host}:{self._port} \r\n")
        self.server_is_running = True

        try:
            while self.server_is_running:
                client_socket, client_address = self._server_socket.accept()
                print(f"[INFO:Connection-Received] A connection has been received from {client_address}")
                client_socket.sendall(b"HTTP/1.1 200 OK\r\n\r\n")
                # handler = None
                # # Init thread and start
                pass
        except KeyboardInterrupt:
            print(f"[Error] Shutting down server due to key interruption")
        except Exception as e:
            print(f"[Error:Exception] {e.__cause__} \r\n Shutting down server...")
        finally:
            self.stop()

    def stop(self):
        self.server_is_running = False
        self._server_socket.close()
        print(f"\r\n [INFO:Stop] Server has stopped listening on {self._host}:{self._port} \r\n")