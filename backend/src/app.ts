import cors from "cors";
import express from "express";
import redemptionRoutes from "./routes/redemptionRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "*", 
    methods: "GET,POST,OPTIONS", // Ensure preflight requests are handled
    allowedHeaders: "Content-Type,Authorization",
    credentials: true // Allow credentials if needed
}));
app.use(express.json());
app.options("*", cors());

app.get("/", (req, res) => {
    res.send("Welcome to the GovWallet Redemption API.");
});

app.use("/api", redemptionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
