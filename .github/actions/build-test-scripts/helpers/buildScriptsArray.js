const getScriptsForApp = require("./getScriptsForApp");

function buildScriptsArray(apps) {
  let scripts = [];

  for (const app of apps) {
    const scriptsForApp = getScriptsForApp(app);

    scripts.push(...scriptsForApp);
  }

  return scripts;
}

module.exports = buildScriptsArray;
