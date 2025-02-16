import { writeRedemptionData } from "../services/fileService";
import * as csvWriter from "csv-writer";

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

    test("should write redemption data successfully", async () => {
        await expect(writeRedemptionData("STAFF_123", "TEAM_X")).resolves.toBeUndefined();
        
        expect(mockWriteRecords).toHaveBeenCalledTimes(1);
        expect(mockWriteRecords).toHaveBeenCalledWith([
            {
                staff_pass_id: "STAFF_123",
                team_name: "TEAM_X",
                created_at: expect.any(String) 
            }
        ]);
    });

    test("should handle file write errors gracefully", async () => {
        mockWriteRecords.mockRejectedValueOnce(new Error("File write error"));

        await expect(writeRedemptionData("STAFF_123", "TEAM_X")).rejects.toThrow("File write error");
    });
});
