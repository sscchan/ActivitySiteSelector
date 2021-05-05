const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const SitesDao = require('./dao/SitesDao.js');
const WeatherDao = require('./dao/WeatherDao');

app.use(express.static('build'))

app.get('/sites', (req, res) => {
  let sites = SitesDao.getSites();
  for (site of sites) {
    site.maxTemperature = WeatherDao.getMaxTemperature(site.latitude, site.longitude);
  }
  res.send(sites);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});