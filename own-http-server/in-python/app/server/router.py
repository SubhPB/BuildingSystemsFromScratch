# Byimaan

import re
from typing import Callable, Dict

from app.constants.http import HTTP_METHODS

class Router:
    def __init__(self) -> None:
        self._route_table: Dict [
            str, # method
            Dict [
                str, # path-pattern
                Dict [
                    str, # regex
                    Callable # fn that controls request / response 
                ]
            ]
        ] = {}

    def __set_route(self, method: str, path: str, handlerFn: Callable):

        if method not in HTTP_METHODS:
            raise ValueError(f"[Error] {method} is not a valid HTTP method")

        if method not in self._route_table:
            self._route_table[method] = { }
        
        if isinstance(self._route_table[method], dict):
            regex = re.compile(
                "^" # start-of-the-pattern
                + path.replace("*", ".*") # so zero or more preceding characters.
                + "$" # end-of-the-pattern
            )

            self._route_table[method][regex.pattern] = {
                "route_regex": regex,
                "route_handler": handlerFn
            }

    @property
    def route_table(self):
        return self._route_table

    def get(self, path, handler):
        self.__set_route("GET", path, handler)
    
    def post(self, path, handler):
        self.__set_route("POST", path, handler)

    def patch(self, path, handler):
        self.__set_route("PATCH", path, handler)

    def delete(self, path, handler):
        self.__set_route("DELETE", path, handler)

    def put(self, path, handler):
        self.__set_route("PUT", path, handler)
