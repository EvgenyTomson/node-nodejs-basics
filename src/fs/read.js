import { access, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const folderName = 'files';
  const fileName = 'fileToRead.txt';
  const errorMessage = 'FS operation failed';
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(__dirname, folderName, fileName);

  try {
    await access(filePath);
    const content = await readFile(filePath, 'utf8');
    console.log(content);
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(errorMessage);
    throw err;
  }
};

await read();
