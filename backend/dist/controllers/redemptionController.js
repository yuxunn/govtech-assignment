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
const redemptionService_1 = require("../services/redemptionService");
const fileService_1 = require("../services/fileService");
class RedemptionController {
    /**
     * Sends a structured API response.
     */
    static sendResponse(res, status, success, message, data = null) {
        res.status(status).json(Object.assign({ success, message }, (data !== null && { data })));
    }
    /**
     * @route GET /redeem/:staffPassId
     * @desc Checks and automatically redeems if eligible.
     */
    static redeemOrCheckStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { staffPassId } = req.params;
                if (!staffPassId) {
                    return RedemptionController.sendResponse(res, 400, false, "Missing staffPassId.");
                }
                const staffMap = yield (0, fileService_1.readStaffData)();
                const eligible = yield (0, redemptionService_1.canRedeem)(staffPassId, staffMap);
                if (!eligible) {
                    return RedemptionController.sendResponse(res, 200, false, "Team has already redeemed their gift.");
                }
                const result = yield (0, redemptionService_1.redeemGift)(staffPassId);
                if (result.startsWith("Redemption successful")) {
                    return RedemptionController.sendResponse(res, 200, true, result);
                }
                RedemptionController.sendResponse(res, 400, false, result);
            }
            catch (error) {
                RedemptionController.sendResponse(res, 500, false, "Internal server error.");
            }
        });
    }
}
exports.default = RedemptionController;
