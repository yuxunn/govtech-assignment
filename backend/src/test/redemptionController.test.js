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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const redemptionService = __importStar(require("../services/redemptionService"));
const fileService = __importStar(require("../services/fileService"));
jest.mock("../services/redemptionService", () => ({
    canRedeem: jest.fn(),
    redeemGift: jest.fn()
}));
jest.mock("../services/fileService", () => ({
    readStaffData: jest.fn()
}));
describe("RedemptionController API Endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("GET /api/redeem/:staffPassId - should redeem successfully if eligible", () => __awaiter(void 0, void 0, void 0, function* () {
        fileService.readStaffData.mockResolvedValue({
            "STAFF_123": "GRYFFINDOR"
        });
        redemptionService.canRedeem.mockResolvedValue(true);
        redemptionService.redeemGift.mockResolvedValue("Redemption successful for team GRYFFINDOR");
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/redeem/STAFF_123");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Redemption successful for team GRYFFINDOR");
    }));
    test("GET /api/redeem/:staffPassId - should return failure if already redeemed", () => __awaiter(void 0, void 0, void 0, function* () {
        fileService.readStaffData.mockResolvedValue({
            "STAFF_123": "GRYFFINDOR"
        });
        redemptionService.canRedeem.mockResolvedValue(false);
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/redeem/STAFF_123");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Team has already redeemed their gift.");
    }));
    test("GET /api/redeem/:staffPassId - should return 400 for missing staffPassId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/redeem/");
        expect(response.status).toBe(404);
    }));
    test("GET /api/redeem/:staffPassId - should return 500 on internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        fileService.readStaffData.mockRejectedValue(new Error("Database error"));
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/redeem/STAFF_123");
        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Internal server error.");
    }));
});
