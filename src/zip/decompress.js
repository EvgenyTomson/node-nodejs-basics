import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';

const decompress = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderName = 'files';
  const sourceName = 'archive.gz';
  const targetName = 'fileToCompress.txt';
  const sourceFile = path.join(__dirname, folderName, sourceName);
  const targetFile = path.join(__dirname, folderName, targetName);

  const readStream = createReadStream(sourceFile);
  const gunzipStream = createGunzip();
  const writeStream = createWriteStream(targetFile);

  readStream
    .pipe(gunzipStream)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(`Successfully decompressed to ${targetName}`);
    });

  readStream.on('error', (err) => {
    console.error(`Error reading compressed file: ${err.message}`);
  });

  writeStream.on('error', (err) => {
    console.error(`Error writing decompressed file: ${err.message}`);
  });
};

await decompress();
