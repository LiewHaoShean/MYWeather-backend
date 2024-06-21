import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createPost, fetchAllPost, fetchMostLikePost, fetchOnePost, fetchOwnPost} from '../controllers/postCtrl.js';
import isAdmin from '../middlewares/isAdmin.js';
import imageFileUpload from '../config/fileUpload.js';



const postRouter = express.Router();
postRouter.post('/createPost', isLoggedIn, imageFileUpload.array("files"), createPost);
postRouter.get('/fetchOwnPost', isLoggedIn, fetchOwnPost);
postRouter.get('/fetchAllPost', isLoggedIn, fetchAllPost);
postRouter.get('/fetchOnePost/:postId',isLoggedIn, fetchOnePost);
postRouter.get('/fetchMostLikePost', isLoggedIn, fetchMostLikePost);

export default postRouter;