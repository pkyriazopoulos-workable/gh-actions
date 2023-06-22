const { config } = require("../constants");

function getConfigsForApps(apps) {
  const configsForApps = [];

  for (const app of apps) {
    const configsForApp = config[app];

    if (configsForApp) {
      configsForApps.push(
        ...configsForApp.map((configForApp) => ({
          app,
          ...configForApp,
        }))
      );
    } else {
      configsForApps.push({
        app,
        name: app,
        command: `NODE_OPTIONS="--max-old-space-size=4096" pnpm -F @workable/${app} run test:simple --maxWorkers=4 --silent`,
      });
    }
  }

  return configsForApps;
}

module.exports = getConfigsForApps;
