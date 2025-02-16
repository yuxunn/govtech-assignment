import { Request, Response } from 'express';
import { canRedeem, redeemGift } from '../services/redemptionService';
import { readStaffData } from '../services/fileService';

class RedemptionController {
    /**
     * Sends a structured API response.
     */
    private static sendResponse(
        res: Response,
        status: number,
        success: boolean,
        message: string,
        data: any = null
    ) {
        res.status(status).json({ success, message, ...(data !== null && { data }) });
    }

    /**
     * @route GET /redeem/:staffPassId
     * @desc Checks and automatically redeems if eligible.
     */
    static async redeemOrCheckStatus(req: Request, res: Response) {
        try {
            const { staffPassId } = req.params;

            if (!staffPassId) {
                return RedemptionController.sendResponse(res, 400, false, "Missing staffPassId.");
            }


            const staffMap = await readStaffData();
            const eligible = await canRedeem(staffPassId, staffMap);

            if (!eligible) {
                return RedemptionController.sendResponse(res, 200, false, "Team has already redeemed their gift.");
            }


            const result = await redeemGift(staffPassId);

            if (result.startsWith("Redemption successful")) {
                return RedemptionController.sendResponse(res, 200, true, result);
            }

            RedemptionController.sendResponse(res, 400, false, result);
        } catch (error) {
            RedemptionController.sendResponse(res, 500, false, "Internal server error.");
        }
    }
}

export default RedemptionController;
