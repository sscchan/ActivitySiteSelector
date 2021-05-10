const WeatherDao = require('./WeatherDao.js');

test('(INTEGRATION) can fetch weather data', async () => {
  let weatherData = await WeatherDao.getDailyWeatherForecast(-35, 138, 1);
  expect(typeof weatherData.forecastTime).toBe('number');
  expect(typeof weatherData.maxTemperature).toBe('number');
});