import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WeatherForecastSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    daily_forecast : []
}, {
    timestamps: true,
    collection: 'forecastWeather'
});

const WeatherForecast = mongoose.model("forecastWeather", WeatherForecastSchema);

export default WeatherForecast;