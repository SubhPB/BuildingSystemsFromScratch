// Byimaan

import { HttpHeader, HttpRequest, Methods, valueOf } from "./types";

export const isString = (val:unknown) => typeof val === 'string'

export const spacer = (times:number=1) => {
    return Array.from({length: times}, () => "\r\n").join("")
}
