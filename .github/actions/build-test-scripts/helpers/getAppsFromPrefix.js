const { apps } = require("../constants");

function getAppsFromPrefix(prefix) {
  switch (prefix) {
    case "shared":
      return apps;

    default:
      return prefix.split(",").filter((app) => apps.includes(app));
  }
}

module.exports = getAppsFromPrefix;
