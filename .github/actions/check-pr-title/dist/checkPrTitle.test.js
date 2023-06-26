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
const checkPrTitle_1 = __importDefault(require("./checkPrTitle"));
const mockSetOutput = jest.fn();
jest.mock("@actions/core", () => ({
    debug: jest.fn(),
    setFailed: jest.fn(),
    setOutput: (...args) => mockSetOutput(...args),
}));
const mockPrTitle = jest.fn();
jest.mock("@actions/github", () => ({
    context: {
        payload: {
            pull_request: {
                get title() {
                    return mockPrTitle();
                },
            },
        },
    },
}));
const mockGetAppNames = jest.fn();
jest.mock("@actions/glob", () => ({
    create: jest.fn().mockResolvedValue({
        glob: () => mockGetAppNames(),
    }),
}));
describe("checkPrTitle", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("should set PR apps as output", () => {
        const apps = ["app1", "app2"];
        const cases = [
            {
                title: "app2: PR title",
                expectedOutput: ["app2"],
            },
            {
                title: "app1, app2: PR title",
                expectedOutput: ["app1", "app2"],
            },
            {
                title: "shared: PR title",
                expectedOutput: ["app1", "app2"],
            },
            {
                title: "misc: PR title",
                expectedOutput: [],
            },
        ];
        Object.values(cases).forEach(({ title, expectedOutput }) => {
            it(`when the PR title is "${title}"`, () => __awaiter(void 0, void 0, void 0, function* () {
                mockPrTitle.mockReturnValue(title);
                mockGetAppNames.mockResolvedValue(apps);
                yield (0, checkPrTitle_1.default)();
                expect(mockSetOutput).toHaveBeenCalledTimes(1);
                expect(mockSetOutput).toHaveBeenCalledWith("apps", expectedOutput);
            }));
        });
    });
    describe("it should not set PR apps as output when", () => {
        it("the PR title is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrTitle.mockReturnValue(123);
            yield (0, checkPrTitle_1.default)();
            expect(mockSetOutput).not.toHaveBeenCalled();
        }));
        it("the glob fails", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrTitle.mockReturnValue("app1: PR title");
            mockGetAppNames.mockRejectedValue(new Error("Glob error"));
            yield (0, checkPrTitle_1.default)();
            expect(mockSetOutput).not.toHaveBeenCalled();
        }));
        it("the PR title does not contain any app", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrTitle.mockReturnValue("PR title");
            mockGetAppNames.mockResolvedValue(["app1", "app2"]);
            yield (0, checkPrTitle_1.default)();
            expect(mockSetOutput).not.toHaveBeenCalled();
        }));
        it("the PR title contains an app that is not in the glob", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrTitle.mockReturnValue("app3: PR title");
            mockGetAppNames.mockResolvedValue(["app1", "app2"]);
            yield (0, checkPrTitle_1.default)();
            expect(mockSetOutput).not.toHaveBeenCalled();
        }));
    });
});
