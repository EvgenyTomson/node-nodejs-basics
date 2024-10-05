const parseEnv = () => {
  const prefix = 'RSS_';

  const prefexedEnvs = Object.entries(process.env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`);

  console.log(prefexedEnvs.join('; '));
};

parseEnv();
