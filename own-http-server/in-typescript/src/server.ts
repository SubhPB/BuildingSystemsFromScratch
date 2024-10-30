// Byimaan

import * as net from "net";
import { HttpRequest } from "./types";
import { parseHttpRequestHeaders } from "./utils";
import { HttpResponse } from "./response";

type callbackGetFunction = (req:HttpRequest, res: HttpResponse) => void

export class Server {
    server: net.Server;

    handlers: {
        [method: string] : {
            [path: string]: {
                regex: RegExp,
                fn: callbackGetFunction
            }
        }
    } = {};

    constructor(){
        this.server = net.createServer(
            socket => {
                // `utf-8` just the way to represent characters and fully compatible with ASCII. 
                socket.setEncoding("utf-8")
                socket.on("data", (data: string | Buffer) => {
                    let request = parseHttpRequestHeaders(data);
                    if (request){
                        let handlerEntry = Object.values(this.handlers[request.method]).find(
                            entry => request.path.match(entry.regex)
                        );

                        const response = new HttpResponse(socket);

                        if (handlerEntry){
                            handlerEntry.fn(request, response);
                        } else {
                            response.status(404, "Not Found").end(`(${request.path}). The given path does not exist`);
                        }
                    }
                })
            }
        );
    };

    public listen(
        port: number,
        hostname: string,
        listeningListener?: () => void, 
    ){
        this.server.listen(port, hostname, listeningListener)
    };

    public get(path: string, callbackFn: callbackGetFunction){
        let regex = new RegExp("^" + path.replace("*", ".*") + "$");

        if (!this.handlers["GET"]){
            this.handlers["GET"] = {};
        }
        this.handlers["GET"][regex.source] = {regex, fn: callbackFn}
    }
}