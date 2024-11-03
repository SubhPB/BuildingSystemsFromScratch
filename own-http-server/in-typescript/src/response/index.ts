// Byimaan

import * as net from "net";
import { HttpHeader } from "../types";
import { isString, spacer } from "../utils";

export class HttpResponse {
    private _socket : net.Socket
    private header : HttpHeader = {};
    private body: string | Uint8Array = '';

    private statusLine = {
        code: 500,
        message: "Internal Server Error",
        version: "1.1"
    };

    constructor (socket:net.Socket){
        this._socket = socket
    };

    private formatResponse = () => {
        const {code, message, version} = this.statusLine;

        const statusLine = `HTTP/${version.trim()} ${code} ${message.trim()}${spacer()}`;

        const headerSection = Object.entries(this.header).map(
            entity => entity.join(": ")
        ).join(spacer()) + spacer(2);

        const bodySection = (
            this.body.length && isString(this.body)
        ) ? (this.body + spacer(2)) : '';

        return `${statusLine}${headerSection}${bodySection}`
    };

    createResponse(){
        return this.formatResponse();
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

    end(body: string | Buffer = ''){
        
        this.body = body instanceof Buffer ? (
            Uint8Array.from(body)
        ) : body;

        this._socket.write(this.formatResponse());
        if (this.body instanceof Uint8Array){
            this._socket.write(this.body)
        };

        this._socket.end()
    };

    get socket(){
        return this._socket
    }

}