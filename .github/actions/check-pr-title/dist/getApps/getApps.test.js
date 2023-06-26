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
const getApps_1 = __importDefault(require("./getApps"));
const mockSetFailed = jest.fn();
jest.mock('@actions/core', () => ({
    debug: jest.fn(),
    setFailed: (...args) => mockSetFailed(...args)
}));
const mockGetAppNames = jest.fn();
jest.mock('@actions/glob', () => ({
    create: jest.fn().mockResolvedValue({
        glob: () => mockGetAppNames()
    })
}));
describe('getApps', () => {
    it('should return apps', () => __awaiter(void 0, void 0, void 0, function* () {
        mockGetAppNames.mockResolvedValueOnce(['app1', 'app2']);
        const apps = yield (0, getApps_1.default)();
        expect(apps).toEqual(['app1', 'app2']);
    }));
    describe('when the glob fails', () => {
        it('should set the action as failed', () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetAppNames.mockRejectedValueOnce(new Error('Glob error'));
            yield (0, getApps_1.default)();
            expect(mockSetFailed).toHaveBeenCalledTimes(1);
            expect(mockSetFailed).toHaveBeenCalledWith('Glob error');
        }));
        it('should return null', () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetAppNames.mockRejectedValueOnce(new Error('Glob error'));
            const apps = yield (0, getApps_1.default)();
            expect(apps).toBeNull();
        }));
    });
});
