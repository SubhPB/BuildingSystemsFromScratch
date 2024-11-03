// Byimaan

export const isString = (val:unknown) => typeof val === 'string'

export const spacer = (times:number=1) => {
    return Array.from({length: times}, () => "\r\n").join("")
};

export const zlibGzipCompress = async (data:any) => {

    const zlib = await import('zlib');
    return new Promise<Error | Buffer>(
        (res, rej) => {
            zlib.gzip(data, (error, compressedData) => {
                if (error){
                    console.log(`[Utils: zlibGzipCompress] An error occurred while compressing data into gzip format ${error.message}`);
                    rej(error)
                } else {
                    res(compressedData)
                }
            })
        }
    );
    
}
