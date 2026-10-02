import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createOrder, verifyPayment, getSubscription } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.use(authMiddleware);

paymentRouter.post('/create-order', createOrder);
paymentRouter.post('/verify', verifyPayment);
paymentRouter.get('/subscription', getSubscription);

export default paymentRouter;
