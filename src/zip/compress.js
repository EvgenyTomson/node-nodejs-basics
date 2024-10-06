import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';

const compress = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderName = 'files';
  const sourceName = 'fileToCompress.txt';
  const targetName = 'archive.gz';
  const sourceFile = path.join(__dirname, folderName, sourceName);
  const targetFile = path.join(__dirname, folderName, targetName);

  const readStream = createReadStream(sourceFile);
  const gzipStream = createGzip();
  const writeStream = createWriteStream(targetFile);

  readStream
    .pipe(gzipStream)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(`Successfully compressed to ${targetName}`);
    });

  readStream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });

  writeStream.on('error', (err) => {
    console.error(`Error writing file: ${err.message}`);
  });
};

await compress();
