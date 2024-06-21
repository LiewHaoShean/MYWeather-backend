import { useEffect, useState } from "react";
import asyncHandler from 'express-async-handler'
import moment from 'moment';
import WeatherForecast from "../model/WeatherForecast.js";

export const currentWeatherApi = asyncHandler(async(req, res)=>{
    const api_key = process.env.API_KEY;
    const {location} = req.body;
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=yes`;

    const weatherData = await fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            res.status(201).json({
                status: "success",
                message: "Current weather API fetched successfully.",
                data: data,
            })
            return;
        })
        .catch((err) => {
            console.log(err.message);
    });

});

export const dailyWeatherApi = asyncHandler(async(req, res)=>{
    const {location} = req.body;
    const formattedDate = moment().format('YYYY-MM-DD');

    const dailyForecast = await WeatherForecast.aggregate([
        {
          $match: {
            "location": location
          }
        },
        {
          $project: {
            forecast: {
              $arrayElemAt: [
                "$daily_forecast",
                {
                  $indexOfArray: ["$daily_forecast.datetime", formattedDate] // Today's date
                }
              ]
            }
          }
        }
      ])
    // console.log(weatherForecast);

    res.json({
        status: "success",
        message: "Forecast Weather fetched successfully",
        dailyForecast,
    });
})

export const weatherForecastData = asyncHandler(async(req, res)=>{
    const {location} = req.body;
    const formattedDate = moment().format('YYYY-MM-DD');

    const weeklyWeatherForecast = await WeatherForecast.aggregate([
      {
        "$match": {
          "location": location,
          "daily_forecast.datetime": {
            "$gt": formattedDate
          }
        }
      },
      {
        "$project": {
          "forecast": {
            "$filter": {
              "input": "$daily_forecast",
              "as": "forecast",
              "cond": {
                "$gt": [
                  "$$forecast.datetime",
                  formattedDate
                ]
              }
            }
          }
        }
      },
      {
        "$project": {
          "forecast": {
            "$slice": ["$forecast", 7]
          }
        }
      }
    ]);

    res.json({
        status: "success",
        message: "7-days weather forecast fetched successfully",
        weeklyWeatherForecast
    })
})
