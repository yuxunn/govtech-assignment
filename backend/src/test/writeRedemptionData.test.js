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
const fileService_1 = require("../services/fileService");
const mockWriteRecords = jest.fn().mockResolvedValue(undefined);
jest.mock("csv-writer", () => ({
    createObjectCsvWriter: jest.fn((config) => ({
        writeRecords: mockWriteRecords
    }))
}));
describe("writeRedemptionData function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("should write redemption data successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, fileService_1.writeRedemptionData)("STAFF_123", "TEAM_X")).resolves.toBeUndefined();
        expect(mockWriteRecords).toHaveBeenCalledTimes(1);
        expect(mockWriteRecords).toHaveBeenCalledWith([
            {
                staff_pass_id: "STAFF_123",
                team_name: "TEAM_X",
                created_at: expect.any(String)
            }
        ]);
    }));
    test("should handle file write errors gracefully", () => __awaiter(void 0, void 0, void 0, function* () {
        mockWriteRecords.mockRejectedValueOnce(new Error("File write error"));
        yield expect((0, fileService_1.writeRedemptionData)("STAFF_123", "TEAM_X")).rejects.toThrow("File write error");
    }));
});
