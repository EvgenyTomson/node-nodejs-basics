import { access, mkdir, copyFile, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const sourceName = 'files';
  const targetName = 'files_copy';
  const sourceDir = path.join(__dirname, sourceName);
  const targetDir = path.join(__dirname, targetName);

  try {
    await access(sourceDir);

    try {
      await access(targetDir);
      throw new Error(errorMessage);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    await mkdir(targetDir, { recursive: true });
    const files = await readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      await copyFile(sourcePath, targetPath);
    }

    console.log(`All folder "${sourceName}" files copied successfully`);
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(errorMessage);
    throw err;
  }
};

await copy();
