# Byimaan
from app.constants.http import DEFAULT_CRLF

def spacer(n=1, CRLF=DEFAULT_CRLF):
    # "\r\n" CRLF would be useful to retrieving and creating buffer for http[request/response]
    return CRLF * n