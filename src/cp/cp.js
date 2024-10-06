import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderName = 'files';
  const childProcessFileName = 'script.js';
  const childProcessFilePath = path.join(__dirname, folderName, childProcessFileName);

  const childProcess = spawn('node', [childProcessFilePath, ...args], { stdio: ['pipe', 'pipe'] });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2', [1, 2, 3]]);
