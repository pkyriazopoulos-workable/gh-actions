const core = require("@actions/core");
const allApps = require("./constants/apps");

function run() {
  try {
    const prefix = core.getInput("prefix");

    if (prefix === "") {
      core.setFailed("Prefix is empty");
      return;
    }

    if (prefix === "shared") {
      core.setOutput("apps", allApps);
      return;
    }

    const apps = allApps.filter((app) => prefix.indexOf(app) > -1);

    core.setOutput("apps", apps);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
