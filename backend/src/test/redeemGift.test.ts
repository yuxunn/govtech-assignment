import { redeemGift } from "../services/redemptionService";
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
    writeRedemptionData: jest.fn(),
    readStaffData: jest.fn()
}));

describe("redeemGift function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should successfully redeem if eligible", async () => {
        (fileService.readStaffData as jest.Mock).mockResolvedValue({
            "STAFF_H123804820G": "RUST"
        });
        (fileService.readRedemptionData as jest.Mock).mockResolvedValue(new Set()); 

        const result = await redeemGift("STAFF_H123804820G");

        expect(result).toBe("Redemption successful for team RUST");
        expect(fileService.writeRedemptionData).toHaveBeenCalledWith("STAFF_H123804820G", "RUST");
    });

    test("should fail if staff ID is not found", async () => {
        (fileService.readStaffData as jest.Mock).mockResolvedValue({});
        const result = await redeemGift("INVALID_ID");

        expect(result).toBe("Redemption failed: Staff ID not found.");
        expect(fileService.writeRedemptionData).not.toHaveBeenCalled();
    });

    test("should fail if team has already redeemed", async () => {
        (fileService.readStaffData as jest.Mock).mockResolvedValue({
            "BOSS_T000000001P": "RUST"
        });
        (fileService.readRedemptionData as jest.Mock).mockResolvedValue(new Set(["RUST"])); 

        const result = await redeemGift("BOSS_T000000001P");

        expect(result).toBe("Redemption failed: Already redeemed or staff not found.");
        expect(fileService.writeRedemptionData).not.toHaveBeenCalled();
    });
});
