const core = require("@actions/core");
const {
  getAppsFromPrefix,
  getAppsWithSplitCoverage,
  getConfigsForApps,
} = require("./helpers");

function run() {
  try {
    const prefix = core.getInput("prefix");

    if (prefix === "") {
      core.setFailed("Prefix is empty");
      return;
    }

    const appsFromPrefix = getAppsFromPrefix(prefix);

    if (!appsFromPrefix) {
      core.setFailed("Apps prefix is empty");
      return;
    }

    const configsForApps = getConfigsForApps(appsFromPrefix);
    const appsWithSplitCoverage = getAppsWithSplitCoverage(appsFromPrefix);

    console.log("appsWithSplitCoverage", appsWithSplitCoverage);

    core.setOutput("configs", configsForApps);
    core.setOutput("apps-with-split-coverage", appsWithSplitCoverage);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
