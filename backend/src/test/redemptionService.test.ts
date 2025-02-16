import { canRedeem } from "../services/redemptionService";
import * as fileService from "../services/fileService"; 
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

    test("should return true for a team that has not redeemed", async () => {
        const mockCSVMapping = {
            "STAFF_H123804820G": "BASS",
            "BOSS_T000000001P": "RUST"
        };

        (fileService.readRedemptionData as jest.Mock).mockResolvedValue(new Set()); 

        const result = await canRedeem("STAFF_H123804820G", mockCSVMapping);
        expect(result).toBe(true);
    });

    test("should return false for a team that has already redeemed", async () => {
        const mockCSVMapping = {
            "STAFF_H123804820G": "BASS",
            "BOSS_T000000001P": "RUST"
        };

        (fileService.readRedemptionData as jest.Mock).mockResolvedValue(new Set(["BASS"])); 

        const result = await canRedeem("STAFF_H123804820G", mockCSVMapping);
        expect(result).toBe(false); 
    });

    test("should return false for an invalid staff ID", async () => {
        const mockCSVMapping = {};

        (fileService.readRedemptionData as jest.Mock).mockResolvedValue(new Set()); 

        const result = await canRedeem("INVALID_ID", mockCSVMapping);
        expect(result).toBe(false);
    });
});
