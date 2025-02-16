"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const redemptionService_1 = require("../services/redemptionService");
const fileService = __importStar(require("../services/fileService"));
/**
 * staff_pass_id,team_name,created_at
 * STAFF_H123804820G,BASS,1623772799000
 * MANAGER_T999888420B,RUST,1623772799000
 * BOSS_T000000001P,RUST,1623872111000
 * STAFF_H1231234567,BASS,1623772799000
 */
jest.mock("../services/fileService", () => ({
    readRedemptionData: jest.fn(),
}));
describe("canRedeem function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("should return true for a team that has not redeemed", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCSVMapping = {
            "STAFF_H123804820G": "BASS",
            "BOSS_T000000001P": "RUST"
        };
        fileService.readRedemptionData.mockResolvedValue(new Set());
        const result = yield (0, redemptionService_1.canRedeem)("STAFF_H123804820G", mockCSVMapping);
        expect(result).toBe(true);
    }));
    test("should return false for a team that has already redeemed", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCSVMapping = {
            "STAFF_H123804820G": "BASS",
            "BOSS_T000000001P": "RUST"
        };
        fileService.readRedemptionData.mockResolvedValue(new Set(["BASS"]));
        const result = yield (0, redemptionService_1.canRedeem)("STAFF_H123804820G", mockCSVMapping);
        expect(result).toBe(false);
    }));
    test("should return false for an invalid staff ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCSVMapping = {};
        fileService.readRedemptionData.mockResolvedValue(new Set());
        const result = yield (0, redemptionService_1.canRedeem)("INVALID_ID", mockCSVMapping);
        expect(result).toBe(false);
    }));
});
