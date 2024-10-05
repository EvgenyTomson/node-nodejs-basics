import * as fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const folderName = 'files';
  const sourceName = 'wrongFilename.txt';
  const targetName = 'properFilename.md';
  const sourceFile = path.join(__dirname, folderName, sourceName);
  const targetFile = path.join(__dirname, folderName, targetName);

  try {
    await fs.access(sourceFile);

    try {
      await fs.access(targetFile);
      throw new Error(errorMessage);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    await fs.rename(sourceFile, targetFile);
    console.log(`File "${sourceName}" successfully renamed as "${targetName}"`);
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(errorMessage);
    throw err;
  }
};

await rename();
