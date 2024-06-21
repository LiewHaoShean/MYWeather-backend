import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { dislikePost, fetchLikePost, likePost } from '../controllers/likeCtrl.js';

const likeRouter = express.Router();
likeRouter.get('/likePost/:postId', isLoggedIn, likePost);
likeRouter.get('/fetchLikePost', isLoggedIn, fetchLikePost);
likeRouter.delete('/dislikePost/:postId', isLoggedIn, dislikePost)

export default likeRouter;