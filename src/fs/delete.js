import { access, rm } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  const folderName = 'files';
  const fileName = 'fileToRemove.txt';
  const errorMessage = 'FS operation failed';
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(__dirname, folderName, fileName);

  try {
    await access(filePath);
    await rm(filePath);
    console.log(`File "${fileName}" was deleted successfully`);
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(errorMessage);
    throw err;
  }
};

await remove();
