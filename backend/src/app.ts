import cors from "cors";
import express from "express";
import redemptionRoutes from "./routes/redemptionRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "https://govtech-assignment.vercel.app", // Only allow requests from your frontend
    methods: "GET,POST", // Allow specific request methods
    allowedHeaders: "Content-Type,Authorization" // Allow headers
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the GovWallet Redemption API.");
});

app.use("/api", redemptionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
