import { access, appendFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const folderName = 'files';
  const fileName = 'Fresh.txt';
  const fileContent = 'I am fresh and young';
  const errorMessage = 'FS operation failed';
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(__dirname, folderName, fileName);

  try {
    await access(filePath);
    throw new Error(errorMessage);
  } catch (err) {
    if (err.code === 'ENOENT') {
      appendFile(filePath, fileContent, 'utf8', (err) => {
        if (err) throw err;
      });
      console.log(`The file "${fileName}" was created successfully.`);
    } else throw err;
  }
};

await create();
