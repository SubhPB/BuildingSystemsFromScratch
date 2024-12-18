// Byimaan

import * as net from "net";
import { HttpRequest, Methods } from "./types";
import { parseHttpRequestHeaders } from "./request";
import { HttpResponse } from "./response";

type callbackFunction = (req:HttpRequest, res: HttpResponse) => void

export class Server {
    server: net.Server;

    handlers: {
        [method: string] : {
            [path: string]: {
                regex: RegExp,
                fn: callbackFunction
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

    private registerRoute(method: keyof typeof Methods, path: string, callbackFn: callbackFunction){
        let regex = new RegExp("^" + path.replace("*", ".*") + "$");

        if (!this.handlers[method]){
            this.handlers[method] = {};
        }
        this.handlers[method][regex.source] = {regex, fn: callbackFn};
    }

    public get(path: string, callbackFn: callbackFunction){
        this.registerRoute("GET", path, callbackFn)
    }

    public post(path: string, callbackFn: callbackFunction){
        this.registerRoute("POST", path, callbackFn)
    }
}