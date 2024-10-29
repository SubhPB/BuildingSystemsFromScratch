// Byimaan

import * as net from "net";
import { HttpHeader, valueOf } from "../types";
import { spacer } from "../utils";

export class HttpResponse {
    private header : HttpHeader = {};
    private body: string = '';

    private statusLine = {
        code: 500,
        message: "Internal Server Error",
        version: "1.1"
    };

    constructor (private socket:net.Socket){
        this.socket = socket
    };

    private formatResponse = () => {
        const {code, message, version} = this.statusLine;

        const statusLine = `HTTP/${version.trim()} ${code} ${message.trim()}${spacer()}`;

        const headerSection = Object.entries(this.header).map(
            entity => entity.join(": ")
        ).join(spacer()) + spacer(2);

        const bodySection = this.body + spacer(2);
        return `${statusLine}${headerSection}${bodySection}`
    }

    status(code:number, message: string, version="1.1"){
        this.statusLine = {
            code,
            message,
            version
        };
        return this
    };

    setHeader(key:string|number, value: string|number){
        this.header[key] = value;
        return this
    };

    setHeaders(headers:(string|number)[][]){
        headers.forEach(
            header => {
                if (header.length >= 2){
                    this.setHeader(header[0], header[header.length -1])
                }
            }
        );
        return this
    };

    end(body?:string){
        if (body) this.body = body;
        this.socket.end(this.formatResponse())
    };

    write = this.socket.write;
}