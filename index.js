const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const SitesDao = require('./dao/SitesDao.js');
const WeatherDao = require('./dao/WeatherDao');

app.use(bodyParser.json());
app.use(express.static('build'))


app.get('/sites', async (req, res) => {
  let sites = await SitesDao.getSites();
  for (site of sites) {
    site.maxTemperature = await WeatherDao.getMaxTemperature(site.latitude, site.longitude);
  }

  if (req.query.maxTemperature) {
    console.log(`Applying max temperature filter of ${req.query.maxTemperature}`);
    sites = sites.filter(function(site) {
      return site.maxTemperature < Number(req.query.maxTemperature);
    });
  }

  res.send(sites);
});

app.delete('/sites/:siteName', async (req, res) => {
  try {
    await SitesDao.deleteSite(req.params.siteName);
    res.status(200).send(req.params.siteName);
  }
  catch (Error) {
    console.log(Error);
    res.status(500).send();
  }
})

app.put('/sites/:siteName', async (req, res) => {
  try {
    console.log(req.body);
    await SitesDao.addSite(req.params.siteName, Number(req.body.latitude), Number(req.body.longitude));
  }
  catch (Error) {
    console.log(Error);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});