import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { approveTransaction, getAllTransactions, makePayment } from "../controllers/paymentCtrl.js";

const paymentRouter = express.Router();
paymentRouter.post('/makePayment', isLoggedIn, makePayment);
paymentRouter.get('/getAllTransaction', isLoggedIn, getAllTransactions);
paymentRouter.post('/approvePayment', isLoggedIn, approveTransaction);

export default paymentRouter;