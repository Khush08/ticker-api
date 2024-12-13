import zlib from 'zlib';
import { promisify } from 'util';
import fetch from 'node-fetch';

const gunzip = promisify(zlib.gunzip);

export const loadGzipJson = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the compressed data as an ArrayBuffer
    const compressedData = await response.arrayBuffer();

    // Decompress the data
    const decompressedData = await gunzip(Buffer.from(compressedData));

    // Parse the JSON
    const jsonData = JSON.parse(decompressedData.toString());

    return jsonData;
};
