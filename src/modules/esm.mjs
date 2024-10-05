import path from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import './files/c.js';

const random = Math.random();

const getJsonData = async (path) => {
  const data = await readFile(path, 'utf-8');
  return JSON.parse(data);
};

let unknownObject;

if (random > 0.5) {
  unknownObject = await getJsonData(new URL('./files/a.json', import.meta.url));
} else {
  unknownObject = await getJsonData(new URL('./files/b.json', import.meta.url));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServer((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
