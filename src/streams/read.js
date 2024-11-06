import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderName = 'files';
  const fileName = 'fileToRead.txt';
  const filePath = path.join(__dirname, folderName, fileName);

  const stream = createReadStream(filePath, { encoding: 'utf-8' });
  stream.pipe(process.stdout, { end: false });

  stream.on('end', () => {
    console.log('\n');
  });

  stream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

await read();
