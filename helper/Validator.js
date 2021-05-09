const ValidationError = require("../error/ValidationError.js");

class Validator {
  static validateGetSites(req) {
    if (req.query.maxTemperature !== undefined) {
      if (isNaN(Number(req.query.maxTemperature))) {
        throw new ValidationError("Max Temperature threshold must be a numerical value");
      }
    }
  }

  static validateDeleteSite(req) {
    if (req.params.siteName === "") {
      throw new ValidationError("Site name must not be an empty String");
    }
  }

  static validatePutSite(req) {
    if (req.params.siteName === "") {
      throw new ValidationError("Site name must not be an empty String");
    }
    
    if (req.body.latitude === "" || isNaN(Number(req.body.latitude))) {
      throw new ValidationError("Latitude must be a numerical value");
    }

    if (req.body.longitude === "" || isNaN(Number(req.body.longitude))) {
      throw new ValidationError("Longitude must be a numerical value");
    }
  }
}


module.exports = Validator;