# Byimaan

import re
from typing import Callable, Dict

from app.constants.http import HTTP_METHODS
from app.server.request.index import Request
from app.server.response.index import Response


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
                + re.sub(
                    r":(\w)+",
                    r"(?P<\1>[^/]+)",
                    path.replace("*", ".*")
                )
                + "$" # end-of-the-pattern
            )

            def handler_modifier(request, response):
                if not isinstance(request, Request):
                    raise ValueError(f"[Value error] request was expected to be of type Request but found {type(request)}")
                if not isinstance(response, Response):
                    raise ValueError(f"[Value error] response was expected to be of type of Response but found {type(response)}")
                requested_path = request.path
                request.search_params = self.__compute_search_params(requested_path)
                request.query_params = self.__compute_query_params(regex, requested_path)
                return handlerFn(request, response)


            self._route_table[method][regex.pattern] = {
                "route_regex": regex,
                "route_handler": handler_modifier
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

    def __compute_search_params(self, path:str):
        search_params = {}

        if path.count("?") == 1 and all([ ch in path for ch in ["?", "="] ]):
            search_params_data = path.split("?")[1].split("&")
            search_params_list = [
                search_param.split("=") for search_param in search_params_data
            ]

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
    
    def __compute_query_params(self, regex, path):
        match = re.match(
            regex,
            # To ensure that any query_param does not include content of search_params
            path if "?" not in path else path.split("?")[0]
        )
        return {} if not match else match.groupdict()
    