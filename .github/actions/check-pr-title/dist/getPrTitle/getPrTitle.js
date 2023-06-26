"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const getPrTitle = () => {
    try {
        const title = (0, core_1.getInput)("pr-title");
        (0, core_1.debug)(`Title: ${title}`);
        if (typeof title !== "string") {
            (0, core_1.setFailed)("PR title is not a string");
            return null;
        }
        if (title === "") {
            (0, core_1.setFailed)("PR title is empty");
            return null;
        }
        return title;
    }
    catch (error) {
        if (error instanceof Error) {
            (0, core_1.setFailed)(error.message);
        }
        else {
            (0, core_1.setFailed)("Error while reading PR title");
        }
        return null;
    }
};
exports.default = getPrTitle;
