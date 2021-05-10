
const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
    console.error("ERROR! OpenWeatherOrg Weather API key not set in environment variable WEATHER_API_KEY");
}

async function getDailyWeatherForecastsFromAPI(latitude, longitude) {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall',{ 
        params: 
        { 
            "lat": latitude,
            "lon": longitude,
            "exclude": "current,minutely,hourly,alerts",
            "units": "metric",
            "appid": WEATHER_API_KEY
        } 
    });
    return response.data;
}

async function getDailyWeatherForecast(latitude, longitude, targetedNumberOfDaysAhead) {
    const numberOfDaysAhead = targetedNumberOfDaysAhead || 1;
    const dailyForecasts = await getDailyWeatherForecastsFromAPI(latitude, longitude);
    return {
        "forecastTime": dailyForecasts.daily[numberOfDaysAhead].dt,
        "maxTemperature": dailyForecasts.daily[numberOfDaysAhead].temp.max
    };
}

exports.getDailyWeatherForecast = getDailyWeatherForecast;