
DEFAULT_CRLF = "\r\n"

HTTP_METHODS = [
    "GET",           # Retrieve data from the server
    "POST",          # Send data to the server to create a resource
    "PUT",           # Update an existing resource on the server
    "DELETE",        # Delete a resource on the server
    "PATCH",         # Partially update a resource on the server
    "HEAD",          # Retrieve the headers of a resource (without the body)
    "OPTIONS",       # Retrieve the allowed methods for a resource
    "TRACE",         # Perform a diagnostic trace of the request-response chain
    "CONNECT",       # Establish a tunnel to the server (often used for SSL/TLS)
    "COPY",          # Copy a resource to a different location
    "LINK",          # Create a link between two resources
    "UNLINK",        # Remove a link between two resources
    "PURGE",         # Remove a cached resource
    "LOCK",          # Lock a resource to prevent modifications
    "UNLOCK",        # Unlock a previously locked resource
    "PROPFIND",      # Retrieve properties of a resource (commonly used in WebDAV)
    "PROPPATCH",     # Update properties of a resource (commonly used in WebDAV)
    "MKCOL",         # Create a new collection (directory or folder, commonly used in WebDAV)
    "MOVE",          # Move a resource to a different location
    "REPORT",        # Used in various scenarios for querying resources
    "MKACTIVITY",    # Create a new activity (specific to WebDAV)
    "CHECKOUT",      # Check out a resource for editing (specific to WebDAV)
    "CHECKIN",       # Check in a previously checked-out resource (specific to WebDAV)
    "VERSION_CONTROL"# Retrieve the version history of a resource
]


HTTP_STATUS = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    103: "Early Hints",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    306: "Switch Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required"
}


CONTENT_TYPE_MAP = {
    "text": {
        "plain": "text/plain; charset=utf-8",
        "html": "text/html; charset=utf-8",
        "css": "text/css; charset=utf-8",
        "javascript": "application/javascript; charset=utf-8",
        "csv": "text/csv; charset=utf-8",
    },
    "application": {
        "json": "application/json; charset=utf-8",
        "xml": "application/xml; charset=utf-8",
        "yaml": "application/x-yaml; charset=utf-8",
        "pdf": "application/pdf",
        "octet-stream": "application/octet-stream",
    },
    "image": {
        "jpeg": "image/jpeg",
        "png": "image/png",
        "gif": "image/gif",
        "bmp": "image/bmp",
        "svg+xml": "image/svg+xml",
    },
    "audio": {
        "mpeg": "audio/mpeg",
        "wav": "audio/wav",
        "ogg": "audio/ogg",
    },
    "video": {
        "mp4": "video/mp4",
        "mpeg": "video/mpeg",
        "quicktime": "video/quicktime",
    },
}

