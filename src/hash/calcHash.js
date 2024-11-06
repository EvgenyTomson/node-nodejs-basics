import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const hashFormat = 'sha256';
  const folderName = 'files';
  const fileName = 'fileToCalculateHashFor.txt';
  const filePath = path.join(__dirname, folderName, fileName);

  const hash = createHash(hashFormat);
  const input = createReadStream(filePath);

  input.on('data', (chunk) => {
    if (chunk) hash.update(chunk);
  });

  input.on('end', () => {
    console.log(hash.digest('hex'));
  });

  input.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

await calculateHash();
