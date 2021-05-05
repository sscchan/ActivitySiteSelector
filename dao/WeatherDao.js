
const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function getDailyWeatherForecasts(latitude, longitude) {
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
    return response.data.daily;
}

async function getMaxTemperature(latitude, longitude) {
    const dailyForecasts = await getDailyWeatherForecasts(latitude, longitude);
    return dailyForecasts[0].temp.max;
}


exports.getMaxTemperature = getMaxTemperature;