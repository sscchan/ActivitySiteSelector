const WeatherDao = require('./WeatherDao.js');

test('(INTEGRATION) can fetch max temperature', async () => {
  let maxTemperature = await WeatherDao.getMaxTemperature(-35, 138);
  expect(typeof maxTemperature).toBe('number');
});