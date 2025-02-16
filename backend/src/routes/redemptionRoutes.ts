import express from 'express';
import RedemptionController from '../controllers/redemptionController';

const router = express.Router();

router.get('/api/redeem/:staffPassId', RedemptionController.redeemOrCheckStatus);

export default router;
