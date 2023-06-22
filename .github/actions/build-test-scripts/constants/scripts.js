const scripts = {
  foo: [
    {
      name: "foo 1",
      command:
        'NODE_OPTIONS="--max-old-space-size=4096" pnpm -F foo run test-1 --maxWorkers=4 --silent',
      coveragePath: "coverage/1/",
    },
    {
      name: "foo 2",
      command:
        'NODE_OPTIONS="--max-old-space-size=4096" pnpm -F foo run test-2 --maxWorkers=4 --silent',
      coveragePath: "coverage/2/",
    },
  ],
};

module.exports = scripts;
