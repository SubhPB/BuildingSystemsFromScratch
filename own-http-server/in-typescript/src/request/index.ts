// Byimaan

import {  isString } from "../utils";
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

        // splitting different parts of our request.
        const reqComponents = data.split("\r\n");

        // extracting request-line
        const [method, path, httpVersion] = reqComponents[0].split(" ");
        
        // retrieve headers
        const headerSection = reqComponents.slice(1, reqComponents.length - 2);

        const header: HttpHeader = Object.fromEntries(
            Array.from(headerSection, (entry) => entry.split(": "))
        );

        let req : HttpRequest = {
            method: Methods[method as valueOf<typeof Methods>],
            path: path,
            header,
            httpVersion: httpVersion as HttpRequest["httpVersion"],
        }
        return req;
    }
    return null
};