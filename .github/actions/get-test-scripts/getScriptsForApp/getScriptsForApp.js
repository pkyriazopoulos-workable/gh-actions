const config = require("../config");

const getScriptsForApp = (app) => {
  if (config[app]) {
    return config[app];
  }

  return [
    {
      name: app,
      script: `npm -F ${app} run test --maxWorkers=4 --silent`,
    },
  ];
};

module.exports = getScriptsForApp;
