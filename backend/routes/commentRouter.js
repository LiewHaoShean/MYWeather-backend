import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createComment, fetchComment } from "../controllers/commentCtrl.js";

const commentRouter = express.Router();
commentRouter.post('/createComment', isLoggedIn, createComment);
commentRouter.post('/getComment', isLoggedIn, fetchComment);

export default commentRouter;