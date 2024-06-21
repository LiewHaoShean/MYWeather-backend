import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv'
import userRouter from '../routes/usersRouter.js';
import cors from "cors";
import { globalErrhandler, notFound } from '../middlewares/globalErrHandler.js';
import weatherRouter from '../routes/weatherRouter.js';
import feedbackRouter from '../routes/feedbackRouter.js';
import postRouter from '../routes/postRouter.js';
import { likePost } from '../controllers/likeCtrl.js';
import likeRouter from '../routes/likeRouter.js';
import commentRouter from '../routes/commentRouter.js';
import tagRouter from '../routes/tagRouter.js';
import paymentRouter from '../routes/paymentRouter.js';

//get database url from env file
dotenv.config();
//connecting database
dbConnect();


const app = express();
app.use(cors());

app.use(express.json());

//url encoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/weather', weatherRouter);
app.use('/api/v1/feedback', feedbackRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/like', likeRouter);
app.use('/api/v1/comment',commentRouter);
app.use('/api/v1/tag', tagRouter);
app.use('/api/v1/payment', paymentRouter)

//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;