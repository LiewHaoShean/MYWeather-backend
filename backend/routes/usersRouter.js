import express from 'express';
import { changePassword, editUserCtrl, generateOtp, getAllUserCtrl, getUserProfileCtrl, loginUserCtrl, registerUserCtrl, validateOtpCode, verifyUserEmail } from '../controllers/userCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const userRouter = express.Router();
userRouter.post('/register', registerUserCtrl);
userRouter.post('/login', loginUserCtrl);
userRouter.get("/verify-email/:token", verifyUserEmail);
userRouter.get("/profile", isLoggedIn, getUserProfileCtrl);
userRouter.get("/allUser", getAllUserCtrl);
userRouter.put("/editUser", isLoggedIn, editUserCtrl);
userRouter.post("/generateOtp", generateOtp);
userRouter.post("/validateOtp", validateOtpCode);
userRouter.post("/changePassword", changePassword);

export default userRouter;