import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderName = 'files';
  const fileName = 'fileToWrite.txt';
  const filePath = path.join(__dirname, folderName, fileName);

  const output = createWriteStream(filePath);
  process.stdin.pipe(output);

  output.on('error', (err) => {
    console.error(`Error writing to file: ${err.message}`);
  });

  // For Windows Ctrl + C stdin exit
  process.on('SIGINT', () => {
    console.log(`Data has been successfully written to ${fileName}`);
    process.exit();
  });

  output.on('finish', () => {
    console.log(`Data has been successfully written to ${fileName}`);
  });
};

await write();
