import express from 'express';
import { currentWeatherApi, dailyWeatherApi, weatherForecastData } from '../controllers/weatherCtrl.js';

const weatherRouter = express.Router();
weatherRouter.post('/currentWeather', currentWeatherApi);
weatherRouter.post('/dailyWeather', dailyWeatherApi);
weatherRouter.post('/weeklyWeather', weatherForecastData);

export default weatherRouter;

