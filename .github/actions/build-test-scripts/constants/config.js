const config = {
  foo: [
    {
      name: "foo 1",
      command:
        'NODE_OPTIONS="--max-old-space-size=4096" pnpm -F foo run test-1 --maxWorkers=4 --silent',
      coveragePath: "apps/foo/coverage/1/coverage-final.json",
    },
    {
      name: "foo 2",
      command:
        'NODE_OPTIONS="--max-old-space-size=4096" pnpm -F foo run test-2 --maxWorkers=4 --silent',
      coveragePath: "apps/foo/coverage/2/coverage-final.json",
    },
  ],
};

module.exports = config;
