import { readStaffData, readRedemptionData, writeRedemptionData } from './fileService';

/**
 * Checks whether the team has already redeemed the gift.
 * @param staff_pass_id - Staff ID of the person attempting redemption.
 * @param staffMap - Preloaded staff data to prevent multiple file reads.
 * @returns {Promise<boolean>} - `true` if the team has not redeemed yet, `false` otherwise.
 */
export const canRedeem = async (staff_pass_id: string, staffMap: Record<string, string>): Promise<boolean> => {
    const redeemedTeams = await readRedemptionData();

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
};

/**
 * Processes the redemption for the given `staff_pass_id` and records it.
 * @param staff_pass_id - The ID of the staff attempting to redeem.
 * @returns {Promise<string>} - A message indicating the redemption status.
 */
export const redeemGift = async (staff_pass_id: string): Promise<string> => {
    console.log(`🔍 Processing redemption request for: ${staff_pass_id}`);

    const staffMap = await readStaffData();

    if (!staff_pass_id) {
        return "Redemption failed: staff_pass_id is required.";
    }

    const teamName = staffMap[staff_pass_id];

    if (!teamName) {
        return "Redemption failed: Staff ID not found.";
    }


    const canRedeemStatus = await canRedeem(staff_pass_id, staffMap);
    if (!canRedeemStatus) {
        return "Redemption failed: Already redeemed or staff not found.";
    }

    try {
        await writeRedemptionData(staff_pass_id, teamName);
        return `Redemption successful for team ${teamName}`;
    } catch (error) {
        return "Redemption failed due to an internal error.";
    }
};
