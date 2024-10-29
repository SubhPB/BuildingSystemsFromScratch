// Byimaan

import { HttpHeader, HttpRequest, Methods, valueOf } from "./types";

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
        const headerSection = reqComponents.slice(1, reqComponents.length - 2);

        const header: HttpHeader = Object.fromEntries(
            Array.from(headerSection, (entry) => entry.split(": "))
        )

        const [userAgentKey, userAgent] = headerSection[1].split(" ");

        let req : HttpRequest = {
            method: Methods[method as valueOf<typeof Methods>],
            path: path,
            header,
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
    body: string = "",
    header: HttpHeader = {}
) => {
    /**
     * What are 3 main components of http response?
     * 1. Status line
     * 2. Headers
     * 3. Body (optional)
     */

    const  statusLine = `HTTP/1.1 ${statusCode} ${statusMessage}${spacer()}`;

    const headerInStringFormat = Array.from(
        Object.entries(header), ([key, val]) => `${key}: ${val}`
    ).join(spacer()) + spacer(2);

    // we're creating syntax like: 
    // HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 3\r\nabc\r\n\r\n
    return `${statusLine}${headerInStringFormat}${body}${spacer(2)}`

};

export class Header {
    private resHeader : HttpHeader = {};

    get(key: string){
        return this.resHeader[key]
    };

    setAll(args: (string | number)[][]){
        for(let arg of args){
            if (arg.length >= 2){
                this.set(arg[0], arg[arg.length - 1])
            };
        };
        return this
    }

    set(key: string | number, value: string | number){
        this.resHeader[key] = value;
        return this
    }

    create(){
        return this.resHeader
    }

    get header(){
        return this.create()
    }
}

