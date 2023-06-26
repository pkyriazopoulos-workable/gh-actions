const withShards = require("./withShards");

const config = {
  foo: [
    ...withShards({
      name: "foo-1",
      script: "npm -F foo run test-1 --maxWorkers=4 --silent",
    }),
    {
      name: "foo-2",
      script: "npm -F foo run test-2 --maxWorkers=4 --silent",
    },
  ],
};

module.exports = config;
