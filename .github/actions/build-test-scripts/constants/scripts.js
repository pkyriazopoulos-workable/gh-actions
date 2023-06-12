const scripts = {
  foo: [
    {
      name: "foo simple",
      command:
        'NODE_OPTIONS="--max-old-space-size=4096" pnpm -F @workable/foo run test:simple --maxWorkers=4 --silent',
    },
    {
      name: "foo msw",
      command:
        'NODE_OPTIONS="--max-old-space-size=4096" pnpm -F @workable/foo run test:msw --maxWorkers=4 --silent',
    },
  ],
};

module.exports = scripts;
