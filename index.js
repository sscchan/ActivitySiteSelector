const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const SitesDao = require('./dao/SitesDao.js');
const WeatherDao = require('./dao/WeatherDao.js');
const Validator = require('./helper/Validator.js');
const ValidationError = require("./error/ValidationError.js");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'))


app.get('/sites', async (req, res) => {
  try {
    Validator.validateGetSites(req);
    let sites = await SitesDao.getSites();
    for (site of sites) {
      let weatherData = await WeatherDao.getDailyWeatherForecast(site.latitude, site.longitude);

      site.forecastTime = weatherData.forecastTime;
      site.maxTemperature = weatherData.maxTemperature;
    }
  
    if (req.query.maxTemperature) {
      console.log(`Applying max temperature filter of ${req.query.maxTemperature}`);
      sites = sites.filter(function(site) {
        return site.maxTemperature < Number(req.query.maxTemperature);
      });
    }
  
    res.send(sites);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).send(error.message);
      return;
    } else {
      console.log(error);
      res.status(500).send();
      return;
    }
  }
});

app.delete('/sites/:siteName', async (req, res) => {
  try {
    Validator.validateDeleteSite(req);
    console.log(`Deleting site named ${req.params.siteName}`);
    await SitesDao.deleteSite(req.params.siteName);
    res.status(200).send(req.params.siteName);
  }
  catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).send(error.message);
      return;
    } else {
      console.log(error);
      res.status(500).send();
    }
  }
})

app.put('/sites/:siteName', async (req, res) => {
  try {
    Validator.validatePutSite(req);
    await SitesDao.addSite(req.params.siteName, Number(req.body.latitude), Number(req.body.longitude));
    res.status(200).send(req.params.siteName);
  }
  catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).send(error.message);
      return;
    } else {
      console.log(error);
      res.status(500).send();
    }
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = { app, server, SitesDao};