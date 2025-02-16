import request from "supertest";
import app from "../app";
import * as redemptionService from "../services/redemptionService";
import * as fileService from "../services/fileService";

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

    test("GET /api/redeem/:staffPassId - should redeem successfully if eligible", async () => {
        (fileService.readStaffData as jest.Mock).mockResolvedValue({
            "STAFF_123": "GRYFFINDOR"
        });
        (redemptionService.canRedeem as jest.Mock).mockResolvedValue(true);
        (redemptionService.redeemGift as jest.Mock).mockResolvedValue("Redemption successful for team GRYFFINDOR");

        const response = await request(app).get("/api/redeem/STAFF_123");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Redemption successful for team GRYFFINDOR");
    });

    test("GET /api/redeem/:staffPassId - should return failure if already redeemed", async () => {
        (fileService.readStaffData as jest.Mock).mockResolvedValue({
            "STAFF_123": "GRYFFINDOR"
        });
        (redemptionService.canRedeem as jest.Mock).mockResolvedValue(false);

        const response = await request(app).get("/api/redeem/STAFF_123");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Team has already redeemed their gift.");
    });

    test("GET /api/redeem/:staffPassId - should return 400 for missing staffPassId", async () => {
        const response = await request(app).get("/api/redeem/");
        expect(response.status).toBe(404);
    });

    test("GET /api/redeem/:staffPassId - should return 500 on internal server error", async () => {
        (fileService.readStaffData as jest.Mock).mockRejectedValue(new Error("Database error"));

        const response = await request(app).get("/api/redeem/STAFF_123");

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Internal server error.");
    });
});
