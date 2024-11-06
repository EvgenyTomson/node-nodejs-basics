const parseArgs = () => {
  const transfopmedArguments = [];
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    transfopmedArguments.push(`${key} is ${value}`);
  }

  console.log(transfopmedArguments.join(', '));
};

parseArgs();
