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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeRedemptionData = exports.readRedemptionData = exports.readStaffData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const csv_writer_1 = require("csv-writer");
const staff_id_to_team_mapping_csv = path_1.default.resolve(__dirname, '../data/staff-id-to-team-mapping-long.csv');
const staff_redeemed_csv = path_1.default.resolve(__dirname, '../data/staff-redeemed.csv');
/**
 * Reads the staff data from CSV and maps staff_pass_id to team_name.
 * @param staff_id_to_team_mapping_csv Path to the CSV file containing staff data.
 * @returns A map of staff_pass_id to team_name.
 */
const readStaffData = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const staffMap = {};
        if (!fs_1.default.existsSync(staff_id_to_team_mapping_csv)) {
            console.warn(`Warning: Staff data file "${staff_id_to_team_mapping_csv}" not found.`);
            return resolve(staffMap);
        }
        fs_1.default.createReadStream(staff_id_to_team_mapping_csv)
            .pipe((0, csv_parser_1.default)({ headers: ['staff_pass_id', 'team_name', 'created_at'], skipLines: 1 }))
            .on('data', (row) => {
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
});
exports.readStaffData = readStaffData;
/**
 * scans data from csv file and returns set of redemeed teams.
 */
const readRedemptionData = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const redeemedTeams = new Set();
        if (!fs_1.default.existsSync(staff_redeemed_csv)) {
            console.warn(`Warning: Redemption data file "${staff_redeemed_csv}" not found.`);
            return resolve(redeemedTeams);
        }
        fs_1.default.createReadStream(staff_redeemed_csv)
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
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
});
exports.readRedemptionData = readRedemptionData;
/**
 * Adds new redemption data to the csv file.
 */ const writeRedemptionData = (staff_pass_id, team_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: staff_redeemed_csv,
            header: [
                { id: 'staff_pass_id', title: 'staff_pass_id' },
                { id: 'team_name', title: 'team_name' },
                { id: 'created_at', title: 'created_at' }
            ],
            append: fs_1.default.existsSync(staff_redeemed_csv),
        });
        yield csvWriter.writeRecords([
            {
                staff_pass_id,
                team_name,
                created_at: Date.now().toString()
            }
        ]);
    }
    catch (error) {
        throw error;
    }
});
exports.writeRedemptionData = writeRedemptionData;
