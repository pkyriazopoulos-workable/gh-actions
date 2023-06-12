const { apps } = require("../constants");

function getAppsFromPrefix(prefix) {
  switch (prefix) {
    case "shared":
      return apps;

    default:
      return apps.filter((app) => prefix.indexOf(app) > -1);
  }
}

module.exports = getAppsFromPrefix;
