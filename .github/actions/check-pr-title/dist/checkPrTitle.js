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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const getPrTitle_1 = __importDefault(require("./getPrTitle"));
const getApps_1 = __importDefault(require("./getApps"));
const getPrApps_1 = __importDefault(require("./getPrApps"));
const checkPrTitle = () => __awaiter(void 0, void 0, void 0, function* () {
    const title = (0, getPrTitle_1.default)();
    const apps = yield (0, getApps_1.default)();
    /**
     * If title or apps is null, it means that there was an error.
     */
    if (title === null || apps === null) {
        return;
    }
    const prApps = (0, getPrApps_1.default)({
        title,
        apps
    });
    /**
     * If prApps is null, it means that there was an error.
     */
    if (prApps === null) {
        return;
    }
    (0, core_1.setOutput)('apps', prApps);
});
exports.default = checkPrTitle;
