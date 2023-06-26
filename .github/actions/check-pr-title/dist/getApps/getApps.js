"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const glob_1 = require("@actions/glob");
const getApps = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let apps = [];
        const globber = yield (0, glob_1.create)("./apps/*", {
            implicitDescendants: false,
        });
        const appDirs = yield globber.glob();
        apps = appDirs.map((appDir) => appDir.split("/").pop());
        (0, core_1.debug)(`Apps: ${apps}`);
        return apps;
    }
    catch (error) {
        if (error instanceof Error) {
            (0, core_1.setFailed)(error.message);
        }
        else {
            (0, core_1.setFailed)('Error while reading apps directory');
        }
        return null;
    }
});
exports.default = getApps;
