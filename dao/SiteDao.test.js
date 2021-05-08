const SiteDao = require('./SitesDao.js');
const { v4: uuidv4 } = require('uuid');

// Global setup awaits a getSite() call to make sure Redis DB is connected
beforeAll(async () => {
  await SiteDao.getSites();
});

afterAll(() => {
  SiteDao.disconnectDatabase();
});

test('(INTEG) can add, get and delete sites', async () => {
  // Add test site
  const testId = `TEST:${uuidv4()}`;
  await SiteDao.addSite(testId, -30, 138);
  
  // Fetch list of test sites, verify newly added test site exists
  const sites = await SiteDao.getSites();
  expect(sites).toContainEqual({
    "name": testId,
    "latitude": -30,
    "longitude": 138 
  });

  // Delete newly added test site
  await SiteDao.deleteSite(testId);

  // Verify deletion of newly added test site
  const sitesAfterDeleteOperation = await SiteDao.getSites();
  expect(sitesAfterDeleteOperation).not.toContainEqual({
    "name": testId,
    "latitude": -30,
    "longitude": 138 
  });
  
});