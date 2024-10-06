import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const workerFileName = 'worker.js';
  const workerPath = path.join(__dirname, workerFileName);

  const createWorker = (data) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerPath);
      worker.postMessage(data);

      worker.on('message', (message) => {
        resolve(message);
        worker.terminate();
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker exit code ${code}`));
        }
      });
    });
  };

  const cpuLogicalCores = cpus().length;
  const workerPromises = [];
  const startNumber = 10;

  for (let i = startNumber; i < cpuLogicalCores + startNumber; i++) {
    workerPromises.push(createWorker(i));
  }

  const results = await Promise.all(workerPromises);
  console.log(results);
};

await performCalculations();
