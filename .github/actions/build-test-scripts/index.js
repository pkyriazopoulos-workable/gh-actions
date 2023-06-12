const core = require("@actions/core");
const { getAppsFromPrefix, buildScriptsArray } = require("./helpers");

function run() {
  try {
    const prefix = core.getInput("prefix");

    if (prefix === "") {
      core.setFailed("Prefix is empty");
      return;
    }

    const apps = getAppsFromPrefix(prefix);

    if (!apps) {
      core.setFailed("Apps is empty");
      return;
    }

    const scripts = buildScriptsArray(apps);

    core.setOutput("scripts", scripts);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
