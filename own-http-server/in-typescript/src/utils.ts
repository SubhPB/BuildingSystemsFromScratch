// Byimaan

import { HttpRequest, Methods, valueOf } from "./types";

const isString = (val:unknown) => typeof val === 'string'

export const parseHttpRequestHeaders = (data: string | Buffer): HttpRequest | null => {
    
    if (isString(data)){
        /**
         * Remember: A HTTP request have 3 main components as follow:-
         * (*) Each separated by CRLF (\r\n)
         * 1. Request line
         * 2. Headers
         * 3. Body (optional) 
         */

        // splitting different parts of our request.
        const reqComponents = data.split("\r\n");

        // extracting request-line
        const [method, path, httpVersion] = reqComponents[0].split(" ");
        
        // retrieve headers
        const headerSection = reqComponents.slice(1, reqComponents.length - 1);

        const [userAgentKey, userAgent] = headerSection[1].split(" ");

        let req : HttpRequest = {
            method: Methods[method as valueOf<typeof Methods>],
            path: path,
            httpVersion: httpVersion as HttpRequest["httpVersion"],
            userAgent,
        }
        return req;
    }
    return null
};

export const spacer = (times:number=1) => {
    return Array.from({length: times}, () => "\r\n").join("")
}

export const createHttpResponse = (
    statusCode:number,
    statusMessage: string = "",
    contentType: string = "text/plain",
    body: string = "",
) => {
    /**
     * What are 3 main components of http response?
     * 1. Status line
     * 2. Headers
     * 3. Body (optional)
     */

    const defaultHttpHeader = `HTTP/1.1 ${statusCode} ${statusMessage}${spacer()}`;

    const contentTypeMsg = `Content-Type: ${contentType}${spacer()}`,
        contentLength = `Content-Length: ${body.length}${spacer(2)}`;

    // we're creating syntax like: 
    // HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 3\r\nabc\r\n\r\n
    return `${defaultHttpHeader}${contentTypeMsg}${contentLength}${body}${spacer(2)}`

}