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
exports.redeemGift = exports.canRedeem = void 0;
const fileService_1 = require("./fileService");
/**
 * Checks whether the team has already redeemed the gift.
 * @param staff_pass_id - Staff ID of the person attempting redemption.
 * @param staffMap - Preloaded staff data to prevent multiple file reads.
 * @returns {Promise<boolean>} - `true` if the team has not redeemed yet, `false` otherwise.
 */
const canRedeem = (staff_pass_id, staffMap) => __awaiter(void 0, void 0, void 0, function* () {
    const redeemedTeams = yield (0, fileService_1.readRedemptionData)();
    if (!staff_pass_id) {
        console.error("Invalid request: staff_pass_id is missing.");
        return false;
    }
    const teamName = staffMap[staff_pass_id];
    if (!teamName) {
        // console.warn(`Staff ID ${staff_pass_id} not found.`);
        return false;
    }
    const alreadyRedeemed = redeemedTeams.has(teamName);
    console.log(`Checking redemption: Team ${teamName} already redeemed?`, alreadyRedeemed);
    return !alreadyRedeemed;
});
exports.canRedeem = canRedeem;
/**
 * Processes the redemption for the given `staff_pass_id` and records it.
 * @param staff_pass_id - The ID of the staff attempting to redeem.
 * @returns {Promise<string>} - A message indicating the redemption status.
 */
const redeemGift = (staff_pass_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🔍 Processing redemption request for: ${staff_pass_id}`);
    const staffMap = yield (0, fileService_1.readStaffData)();
    if (!staff_pass_id) {
        return "Redemption failed: staff_pass_id is required.";
    }
    const teamName = staffMap[staff_pass_id];
    if (!teamName) {
        return "Redemption failed: Staff ID not found.";
    }
    const canRedeemStatus = yield (0, exports.canRedeem)(staff_pass_id, staffMap);
    if (!canRedeemStatus) {
        return "Redemption failed: Already redeemed or staff not found.";
    }
    try {
        yield (0, fileService_1.writeRedemptionData)(staff_pass_id, teamName);
        return `Redemption successful for team ${teamName}`;
    }
    catch (error) {
        return "Redemption failed due to an internal error.";
    }
});
exports.redeemGift = redeemGift;
