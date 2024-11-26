# Byimaan
import os
from app.constants.http import DEFAULT_CRLF, CONTENT_TYPE_MAP

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

def get_content_type(data_type:str, sub_type: str):
    return CONTENT_TYPE_MAP.get(data_type, {}).get(sub_type, CONTENT_TYPE_MAP["application"]["octet-stream"])

def does_path_exist(path:str):
    return os.path.exists(path)

def is_file(file_path:str):
    return does_path_exist(file_path) and os.path.isfile(file_path)

def is_dir(dir_path:str):
    return does_path_exist(dir_path) and os.path.isdir(dir_path)


