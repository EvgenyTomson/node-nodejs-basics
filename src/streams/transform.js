import { Transform } from 'stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      callback(null, reversedChunk);
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
