const { config } = require("../constants");

function getAppsWithSplitCoverage(apps) {
  return apps.filter((app) => {
    if (!config[app]) {
      return false;
    }

    return config[app].some(
      (configForApp) => configForApp.coveragePath !== undefined
    );
  });
}

module.exports = getAppsWithSplitCoverage;
