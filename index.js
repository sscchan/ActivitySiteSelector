const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const SitesDao = require('./dao/SitesDao.js');
const WeatherDao = require('./dao/WeatherDao');

app.use(express.static('build'))

app.get('/sites', async (req, res) => {
  let sites = await SitesDao.getSites();
  for (site of sites) {
    site.maxTemperature = await WeatherDao.getMaxTemperature(site.latitude, site.longitude);
  }
  res.send(sites);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});