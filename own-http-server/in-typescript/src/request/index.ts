// Byimaan

import {  isString, spacer } from "../utils";
import { Methods, HttpRequest, HttpHeader, valueOf } from "../types";

export const parseHttpRequestHeaders = (data: string | Buffer): HttpRequest | null => {
    
    if (isString(data)){
        /**
         * Remember: A HTTP request have 3 main components as follow:-
         * (*) Each separated by CRLF (\r\n)
         * 1. Request line
         * 2. Headers
         * 3. Body (optional) 
         */

        // See we did ...reqBody because we do not skip data if user intentionally might have used CRLF symbols too many times in the request body
        const [reqHead, ...reqBody] = data.split(spacer(2));

        const [reqLine, ...headers] = reqHead.split(spacer())

        // extracting request-line
        const [method, path, httpVersion] = reqLine.split(" ");
        
        let body:any = undefined;

        if (reqBody && reqBody?.length){
            body = reqBody.join('')
        }

        const header: HttpHeader = Object.fromEntries(
            Array.from(headers, (entry) => (
                entry.includes(': ') ? entry.split(": ") : []
            ))
        );

        let req : HttpRequest = {
            method: Methods[method as valueOf<typeof Methods>],
            path: path,
            header,
            httpVersion: httpVersion as HttpRequest["httpVersion"],
            body
        }
        return req;
    }
    return null
};