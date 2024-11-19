# Byimaan
from typing import Callable
from app.constants.http import DEFAULT_CRLF

def spacer(n=1, CRLF=DEFAULT_CRLF):
    # "\r\n" CRLF would be useful to retrieving and creating buffer for http[request/response]
    return CRLF * n

def find(arr:list, callbackFn:callable):
    for index, value in enumerate(arr):
        try:
            if callbackFn(value, index):
                return value
        except TypeError:
            if callbackFn(value):
                return value
    return None
