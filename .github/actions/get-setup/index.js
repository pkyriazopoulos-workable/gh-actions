const { debug, getInput, setFailed, setOutput } = require("@actions/core");

const getScriptsForApp = require("./getScriptsForApp");

function run() {
  try {
    const apps = JSON.parse(getInput("apps"));

    const scripts = apps.reduce((acc, app) => {
      const scriptsForApp = getScriptsForApp(app);

      return [...acc, ...scriptsForApp];
    }, []);

    debug("scripts", scripts);

    setOutput("scripts", scripts);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      setFailed("Error when getting scripts for apps");
    }
  }
}

run();
