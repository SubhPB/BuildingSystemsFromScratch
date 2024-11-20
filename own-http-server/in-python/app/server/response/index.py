# Byimaan
import socket
from app.utils.fn import spacer
from app.constants.http import HTTP_STATUS

class Response:
    def __init__(self, client_socket:socket.socket) -> None:
        self.__client_socket = client_socket
        self.__response_line = {
            "version": "HTTP/1.1",
            "status_code": 500,
            "status_message": HTTP_STATUS[500]
        }
        self.headers = {}
        self.body = ""

    def __parse_response(self):
        response_line_data = " ".join([f"{value}" for value in self.__response_line.values()]) + spacer(1)

        response_headers_data = ""
        for key, value in self.headers:
            if isinstance(value, list):
                value = ", ".join(value)
            response_headers_data += (
                f"{key}: {value}" + spacer(1)
            )

        response_body_data = self.body + spacer(1)

        response = spacer(1).join([
            response_line_data, response_headers_data, response_body_data
        ]) + spacer(1)

        return response.encode("utf-8") # in buffer format

    def set_header(self, header_key, *header_value):
        if len(header_value) == 1:
            # Our goal was to allow apply apply multiple header values with or without passing list as argument e.g set_header(key, val1, val2, val3)
            header_value = header_value[0] if not isinstance(header_value, list) else header_value[0][0]
        self.headers[header_key] = header_value
        return self
    
    def set_headers(self, *header_items:list[list]):
        if isinstance(header_items[0][0], list):
            header_items = header_items[0]
        
        if all( isinstance(item, list) and len(item) >= 2 for item in header_items):
            self.headers = {
                **self.headers,
                **dict(header_items)
            }
            return self
        else:
            raise ValueError(f"[ValueError] Incorrect argument data type passed to {self.set_headers.__name__}")
        
    def set_status(self, code:int):
        self.__response_line["status_message"] = HTTP_STATUS[code]
        self.__response_line["status_code"] = code
        return self
    
    def end(self, body=None):
        if body:
            self.body = body
        try:
            response = self.__parse_response()
            print("Parsed response = ", response)
        except Exception as e:
            print("Error occurred while parsing response")
            print(e)
            raise e
        self.__client_socket.sendall(
            self.__parse_response()
        )
        self.__client_socket.close()