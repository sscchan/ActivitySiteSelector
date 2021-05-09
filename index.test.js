const request = require("supertest");
const SitesDao = require('./dao/SitesDao.js');
const WeatherDao = require('./dao/WeatherDao.js');
const Validator = require('./helper/Validator.js');
const { app, server } = require('./index.js');

afterAll(async (done) => {
  SitesDao.disconnectDatabase();
  server.close();
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // wait for server to shutdown  
  done();
});

jest.mock('./dao/SitesDao.js');
jest.mock('./dao/WeatherDao.js');
jest.mock('./helper/Validator.js');

beforeEach(() => {

})

test('should filter out sites by Max Temperature threshold', async (done) => {
  SitesDao.getSites.mockResolvedValue([
    { "name": "Mock1", "latitude": -34.9285, "longitude": 138.6007 },
    { "name": "Mock2", "latitude": -35.0732, "longitude": 138.8576 },
  ]);

  WeatherDao.getMaxTemperature
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(99);

  const getSitesResponse = await request(app).get(`/sites?maxTemperature=50`);
  expect(getSitesResponse.status).toBe(200);
  expect(Array.isArray(getSitesResponse.body)).toBe(true);
  expect(getSitesResponse.body.length).toBe(1);
  expect(getSitesResponse.body[0].maxTemperature).toBe(10);

  SitesDao.getSites.mockClear();
  done();
});