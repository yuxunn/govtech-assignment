import express from 'express';
import redemptionRoutes from './routes/redemptionRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', redemptionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
