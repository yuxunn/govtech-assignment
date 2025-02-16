import { writeRedemptionData } from "../services/fileService";
import fs from "fs";

jest.mock("fs");

describe("writeRedemptionData function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should write redemption data successfully", async () => {
        const mockWriteFileSync = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});

        await writeRedemptionData("STAFF_123", "TEAM_X");

        expect(mockWriteFileSync).toHaveBeenCalled();
    }, 15000); 


});
