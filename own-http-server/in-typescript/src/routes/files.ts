// Handle files

import { spacer } from "../utils";
import fs from "fs";
import path from "path";
import { HttpRequest } from "../types";
import { HttpResponse } from "../response";

/**
 * `/files/${fileName}`
 * We can assume that file named fileName exists under the ../src or FILE_DIRECTORY. if our handler is not able to find it then we would response back with 404
 * Learning Goals:
 * (*) Learn to send data in chunks using TCP in a http format to the client.
 */

export const HandleFiles = async(req:HttpRequest, res:HttpResponse) => {
    const fileName = req.path.split("/")[2];
    const FILE_DIRECTORY = "../src";
    
    if (fileName){

        try {
            const filesInDir = await fs.promises.readdir(FILE_DIRECTORY);
            const matchedFileWithExt = filesInDir.find(
                file => path.parse(file).name === fileName
            );

            if (matchedFileWithExt){
                const filePath = path.join(FILE_DIRECTORY, matchedFileWithExt);
    
                //ready to stream file
                res.status(200, "OK").setHeaders([
                    // used octet-stream means file data type is unknown
                    ['Content-Type', 'application/octet-stream'], 
                    ['Transfer-Encoding', 'chunked']
                ]);
    
                // After res.write we have not yet ended the connection.
                // It will end when we call `.end`. Below letting the user know about kind of content we is going to receive.
                res.socket.write(res.createResponse());
    
                const fileStream = fs.createReadStream(filePath);
    
                /** IN following we're sending chunk along with length + CRLF because user is expecting a HTTP response.
                 * There is no need to do such things if there is raw TCP connection.
                  */

                fileStream.on('data', async (chunk) => {
                    console.log(''); console.log("Chunk ", chunk); console.log('')
                    const chunkLengthInHexDecimal = chunk.length.toString(16);
                    // Be Aware we not did spacer(2) at the end because we do not want to indicate the end of data to user.

                    res.socket.write(`${chunkLengthInHexDecimal}${spacer()}`);
                    res.socket.write(chunk);
                    res.socket.write(spacer())
                });
                

                fileStream.on('end', () => {
                    res.socket.end(`0${spacer(2)}`);
                    console.log("Successfully sent file ", fileName)
                });
    
                fileStream.on('error', () => {
                    console.log("Error occurred while streaming file")
                    res.socket.end();
                });
    
            } else {
                res.status(404, "Not Found").end(`File with the given name not found`)
            }
        } catch (error) {
            res.status(500, "Internal Server Error").end(
                error instanceof Error ? error.message : "Server Error while reading files"
            )
        }
    } else {
        res.status(404, "Not Found").end(`File with the given name not found`)
    }
}