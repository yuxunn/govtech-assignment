import express from "express";
import path from "path";
import cors from "cors";
import redemptionRoutes from "./routes/redemptionRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "https://govtech-assignment-daofpfo8x-yuxunns-projects.vercel.app" }));

const frontendBuildPath = path.join(__dirname, "../../frontend/build");
app.use(express.static(frontendBuildPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.use("/api", redemptionRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
