import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

const staff_id_to_team_mapping_csv = path.resolve(__dirname, '../data/staff-id-to-team-mapping-long.csv');
const staff_redeemed_csv = path.resolve(__dirname, '../data/staff-redeemed.csv');

interface staffRow {
    staff_pass_id: string;
    team_name: string;
    created_at: string;
}

interface redeemedRow {
    staff_pass_id: string;
    team_name: string;
    created_at: string;
}

/**
 * Reads the staff data from CSV and maps staff_pass_id to team_name.
 * @param staff_id_to_team_mapping_csv Path to the CSV file containing staff data.
 * @returns A map of staff_pass_id to team_name.
 */
export const readStaffData = async (): Promise<Record<string, string>> => {
    return new Promise((resolve, reject) => {
        const staffMap: Record<string, string> = {};

        if (!fs.existsSync(staff_id_to_team_mapping_csv)) {
            console.warn(`Warning: Staff data file "${staff_id_to_team_mapping_csv}" not found.`);
            return resolve(staffMap);
        }

        fs.createReadStream(staff_id_to_team_mapping_csv)
            .pipe(csv({ headers: ['staff_pass_id', 'team_name', 'created_at'], skipLines: 1 }))
            .on('data', (row: Partial<staffRow>) => {
                if (row.staff_pass_id && row.team_name) {
                    staffMap[row.staff_pass_id.trim()] = row.team_name.trim();
                }
            })
            .on('end', () => resolve(staffMap))
            .on('error', (error) => {
                console.error("Error reading staff data:", error);
                reject(error);
            });
    });
};

/**
 * scans data from csv file and returns set of redemeed teams. 
 */
export const readRedemptionData = async (): Promise<Set<string>> => {
    return new Promise((resolve, reject) => {
        const redeemedTeams = new Set<string>();

        if (!fs.existsSync(staff_redeemed_csv)) {
            console.warn(`Warning: Redemption data file "${staff_redeemed_csv}" not found.`);
            return resolve(redeemedTeams);
        }

        fs.createReadStream(staff_redeemed_csv)
            .pipe(csv())
            .on('data', (row: Partial<redeemedRow>) => {
                if (row.team_name) {
                    redeemedTeams.add(row.team_name.trim());
                }
            })
            .on('end', () => resolve(redeemedTeams))
            .on('error', (error) => {
                console.error("Error reading redemption data:", error);
                reject(error);
            });
    });
};

/**
 * Adds new redemption data to the csv file.
 */export const writeRedemptionData = async (staff_pass_id: string, team_name: string): Promise<void> => {
    try {

        const csvWriter = createObjectCsvWriter({
            path: staff_redeemed_csv,
            header: [
                { id: 'staff_pass_id', title: 'staff_pass_id' },
                { id: 'team_name', title: 'team_name' },
                { id: 'created_at', title: 'created_at' }
            ],
            append: fs.existsSync(staff_redeemed_csv),
        });

        await csvWriter.writeRecords([
            {
                staff_pass_id,
                team_name,
                created_at: Date.now().toString()
            }
        ]);
    } catch (error) {
        throw error;
    }
};
