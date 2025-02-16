import cors from "cors";
import express from "express";
import redemptionRoutes from "./routes/redemptionRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "https://govtech-assignment-daofpfo8x-yuxunns-projects.vercel.app" }));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the GovWallet Redemption API.");
});

app.use("/api", redemptionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
