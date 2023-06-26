"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPrTitle_1 = __importDefault(require("./getPrTitle"));
const mockSetFailed = jest.fn();
jest.mock('@actions/core', () => ({
    debug: jest.fn(),
    setFailed: (...args) => mockSetFailed(...args)
}));
const mockPrTitle = jest.fn();
jest.mock('@actions/github', () => ({
    context: {
        payload: {
            pull_request: {
                get title() {
                    return mockPrTitle();
                }
            }
        }
    }
}));
describe('getPrTitle', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return the PR title', () => {
        mockPrTitle.mockReturnValue('PR title');
        const title = (0, getPrTitle_1.default)();
        expect(title).toEqual('PR title');
    });
    describe('when the PR title is not a string', () => {
        beforeEach(() => {
            mockPrTitle.mockReturnValue(123);
        });
        it('should set the action as failed', () => {
            (0, getPrTitle_1.default)();
            expect(mockSetFailed).toHaveBeenCalledTimes(1);
            expect(mockSetFailed).toHaveBeenCalledWith('PR title is not a string');
        });
        it('should return null', () => {
            const title = (0, getPrTitle_1.default)();
            expect(title).toBeNull();
        });
    });
    describe('when the PR title is empty', () => {
        beforeEach(() => {
            mockPrTitle.mockReturnValue('');
        });
        it('should set the action as failed', () => {
            (0, getPrTitle_1.default)();
            expect(mockSetFailed).toHaveBeenCalledTimes(1);
            expect(mockSetFailed).toHaveBeenCalledWith('PR title is empty');
        });
        it('should return null', () => {
            const title = (0, getPrTitle_1.default)();
            expect(title).toBeNull();
        });
    });
});
