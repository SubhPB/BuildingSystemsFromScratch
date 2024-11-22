# Byimaan

import socket
import re
from app.server.router import Router
from app.server.request.index import Request
from app.server.response.index import Response
from app.utils.fn import find
from app.utils.custom_errors import HttpPathDoesNotExist

class Server:
    def __init__(self, host: str, port: int) -> None:
        self._host = host
        self._port = port
        self._server_socket = socket.socket(
            socket.AF_INET, # Address-family = Internet; Use IPv4; AF_INET6 for TPv6
            socket.SOCK_STREAM # Socket type should be stream which is typical for TCP connections
        )
        self.server_is_running = False
        self._router = None
    
    def config_router(self, router: Router):
        self._router = router
        return self
        
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
               
                request, response = Request(client_socket), Response(client_socket)

                try:
                    print(f"[{request.request_line}] request received from {client_address}")
                    req_method, req_path = request.method, request.path

                    route_table = None if not self._router else self._router.route_table
                    
                    if route_table and req_method in route_table:
                        def verify_handler(route):
                            route_regex = route["route_regex"], route["route_handler"]
                            return re.match(route_regex, req_path)

                        route = find(route_table.values(), verify_handler)

                        if route:
                            route["route_handler"](request, response)
                        else:
                            raise HttpPathDoesNotExist("Not found")

                    else:
                        raise HttpPathDoesNotExist("Not found")
                    
                except HttpPathDoesNotExist:
                    response.set_status(404).end(f"[Path: {req_path}] given path not found")
                except Exception as e:
                    response.set_status(500).end(e)

        except KeyboardInterrupt:
            print(f"[Error] Shutting down server due to key interruption")
        except Exception as e:
            print(f"[Error:Exception] {e} \r\n Shutting down server...")
        finally:
            self.stop()

    def stop(self):
        self.server_is_running = False
        self._server_socket.close()
        print(f"\r\n [INFO:Stop] Server has stopped listening on {self._host}:{self._port} \r\n")