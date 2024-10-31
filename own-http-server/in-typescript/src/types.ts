//Byimaan

export type valueOf<O> = O[keyof O]

export enum Methods {
    GET = "GET",
    POST = "POST",
    HEAD = "HEAD",
    PUT = "PUT",
    DELETE = "DELETE",
    CONNECT = "CONNECT", // It is used to create a tunnel through a proxy server to destination server. useful when you want to make a secure connection e.g. HTTPS over an HTTP proxy.
    OPTIONS = "OPTIONS", // Browser make `OPTIONS` req to server for CORS functionality to see if requesting domain is allowed by the server.
    TRACE = "TRACE", // Useful to trace our request to see if is this really getting received by the server. Can be used to trace request which was sent to server running behind any proxy. 
    PATCH = "PATCH",
};

export interface HttpRequest {
    method: Methods,
    path: string,
    httpVersion: "HTTP/1.1" | "HTTP/2",
    header: HttpHeader,
    body ?: any
};

export interface HttpHeader {
    [key:string|number]: string | number
}