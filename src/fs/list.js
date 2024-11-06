import { access, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const folderName = 'files';
  const folderPath = path.join(__dirname, folderName);

  try {
    await access(folderPath);
    const files = await readdir(folderPath);
    console.log(files.join('\n'));
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(errorMessage);
    throw err;
  }
};

await list();
