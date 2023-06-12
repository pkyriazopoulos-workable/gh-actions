const { scripts } = require("../constants");

function getScriptsForApp(app) {
  if (scripts[app]) {
    return scripts[app];
  }

  return [
    {
      name: app,
      command: `NODE_OPTIONS="--max-old-space-size=4096" pnpm -F @workable/${app} run test:simple --maxWorkers=4 --silent`,
    },
  ];
}

module.exports = getScriptsForApp;
