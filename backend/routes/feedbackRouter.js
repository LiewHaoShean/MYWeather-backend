import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { getAllFeedback, getOneFeedback, giveFeedback } from '../controllers/feedbackCtrl.js';

const feedbackRouter = express.Router();
feedbackRouter.post('/giveFeedback', isLoggedIn, giveFeedback);
feedbackRouter.get('/getAllFeedback', isLoggedIn, getAllFeedback);
feedbackRouter.get('/getOneFeedback/:feedbackId', isLoggedIn, getOneFeedback);

export default feedbackRouter;