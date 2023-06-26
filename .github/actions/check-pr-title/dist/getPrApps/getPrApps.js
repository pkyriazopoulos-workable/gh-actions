"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const getPrApps = ({ title, apps }) => {
    if (title.indexOf(":") === -1) {
        (0, core_1.setFailed)('PR title does not contain ":"');
        return null;
    }
    let prefixApps = [];
    try {
        prefixApps = title
            .split(":")[0]
            .split(",")
            .map((app) => app.trim());
        (0, core_1.debug)(`Prefix apps: ${prefixApps}`);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, core_1.setFailed)(error.message);
        }
        else {
            (0, core_1.setFailed)("Error while apps from prefix");
        }
        return null;
    }
    if (prefixApps.length === 0) {
        (0, core_1.setFailed)("PR title does not contain valid apps");
        return null;
    }
    if (prefixApps.includes("shared")) {
        (0, core_1.debug)(`PR apps: ${apps}`);
        return apps;
    }
    if (prefixApps.includes("misc")) {
        (0, core_1.debug)(`PR apps: None`);
        return [];
    }
    const prApps = prefixApps.filter((app) => apps.includes(app));
    if (prApps.length === 0) {
        (0, core_1.setFailed)("PR title does not contain valid apps");
        return null;
    }
    return prApps;
};
exports.default = getPrApps;
