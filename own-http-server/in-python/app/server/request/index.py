# Byimaan

import socket
from app.utils.fn import spacer

class Request:
    def __init__(self, client_socket: socket.socket,):

        self.request_data = client_socket.recv(1024).decode('utf-8')

        [
            self.request_line,
            remaining_data
        ] = self.request_data.split(spacer(1), maxsplit=1)

        # data to retrieve from request line 
        [
            self.method,
            self.path,
            self.version
        ] = self.request_line.split(" ")

        self.search_params = self.__compute_search_params()

        # header and body section
        [
            header_section,
            self.body
        ] = remaining_data.split( spacer(2) )
    
        headers_data = header_section.split(spacer(1))
        header_list= [ header.split(": ") for header in headers_data ]

        self.headers = { 
            f"{key}": (
                value if "," not in value else [ val.strip() for val in value.split(",") ]
            ) for key, value in header_list 
        }

    def __compute_search_params(self):
        search_params = {}
        
        if '?' in self.path:
            search_params_data = self.path.split("?")[1].split("&")

            search_params_list = [ search_param.split("=") for search_param in search_params_data ]
            
            for key, value in search_params_list:
                if key in search_params:
                    if not isinstance(search_params[key], list):
                        search_params[key] = [
                            search_params[key]
                        ]
                    search_params[key].append(value)
                else:
                    search_params[key] = value

        return search_params
    