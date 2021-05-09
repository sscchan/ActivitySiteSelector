const request = require("supertest");
const { v4: uuidv4 } = require('uuid');
const { app, server, SitesDao } = require('./index.js');

afterAll(async (done) => {
  SitesDao.disconnectDatabase();
  server.close();
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // wait for server to shutdown  
  done();
});

test("should get / ", async (done) => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  done();
});

test("(INTEGRATION) should add site, get sites, and delete site", async (done) => {
  const testId = `TEST:${uuidv4()}`;

  // Add Site
  const addSiteResponse =
    await request(app)
      .put(`/sites/${testId}`)
      .send({
        "latitude": "-30",
        "longitude": "138"
      });

  expect(addSiteResponse.status).toBe(200);

  // Fetch Sites
  const getSitesResponse = await request(app).get(`/sites`);
  expect(getSitesResponse.status).toBe(200);
  expect(Array.isArray(getSitesResponse.body)).toBe(true);
  const siteNames = getSitesResponse.body.map((site) => site.name);
  expect(siteNames).toContain(testId);

  // Delete Site
  const deleteSiteResponse = await request(app).delete(`/sites/${testId}`);
  expect(deleteSiteResponse.status).toBe(200);

  done();
});