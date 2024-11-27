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



def retrieve_dir_children(valid_dir_path: str, depth=1):
    
    record = {
        "files": [],
        "dirs": {}
    }
    
    if depth >= 0:
        for item in os.listdir(valid_dir_path):
            item_path = os.path.join(valid_dir_path, item)
            if is_file(item_path):
                record["files"].append(item_path)
            elif is_dir(item_path):
                record["dirs"][f"{item_path}"] = retrieve_dir_children(
                    item_path,
                    depth - 1
                )
            
    return record
