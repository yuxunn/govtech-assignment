"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const redemptionRoutes_1 = __importDefault(require("./routes/redemptionRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: "https://govtech-assignment.vercel.app",
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));
app.use(express_1.default.json());
const frontendBuildPath = path_1.default.join(__dirname, "../../frontend/build");
app.use(express_1.default.static(frontendBuildPath));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(frontendBuildPath, "index.html"));
});
app.use("/api", redemptionRoutes_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(frontendBuildPath, "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
