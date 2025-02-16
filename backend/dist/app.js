"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const redemptionRoutes_1 = __importDefault(require("./routes/redemptionRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)({ origin: "https://govtech-assignment-daofpfo8x-yuxunns-projects.vercel.app" }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to the GovWallet Redemption API.");
});
app.use("/api", redemptionRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
