import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createTag, getAllTag, removeTag } from '../controllers/tagCtrl.js';

const tagRouter = express.Router();
tagRouter.post('/createTag', isLoggedIn, createTag);
tagRouter.get('/fetchAllTag', getAllTag);
tagRouter.post('/removeTag', isLoggedIn, removeTag);

export default tagRouter;