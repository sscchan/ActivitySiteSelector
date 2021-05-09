const ValidationError = require("../error/ValidationError.js");
const Validator = require("./Validator.js");

describe('testing validateGetSites', () => {
  test('does not throw Error when max temperature threshold is numeric string', () => {
    const req = {
      "query": {
        "maxTemperature": "12.3"
      }
    };

    expect(() => {Validator.validateGetSites(req)}).not.toThrowError(ValidationError);
  });

  test('throws Error when max temperature threshold is non-numeric', () => {
    const req = {
      "query": {
        "maxTemperature": "nonNumericalStringInput"
      }
    };

    expect(() => {Validator.validateGetSites(req)}).toThrowError(ValidationError);
  });
})

describe('testing validateDeleteSite', () => {
  test('does not throw Error when site name is valid string', () => {
    const req = {
      "params": {
        "siteName": "Adelaide"
      }
    };

    expect(() => {Validator.validateDeleteSite(req)}).not.toThrowError(ValidationError);
  });

  test('throws Error when site name is empty string', () => {
    const req = {
      "params": {
        "siteName": ""
      }
    };

    expect(() => {Validator.validateDeleteSite(req)}).toThrowError(ValidationError);
  });
});

describe('testing validatePutSite', () => {
  test('does not throw Error with valid inputs', () => {
    const req = {
      "params": {
        "siteName": "Adelaide"
      },
      "body": {
        "latitude": -38,
        "longitude": 138
      }
    };

    expect(() => {Validator.validatePutSite(req)}).not.toThrowError(ValidationError);
  })

  test('throws Error when site name is empty string', () => {
    const req = {
      "params": {
        "siteName": ""
      },
      "body": {
        "latitude": -38,
        "longitude": 138
      }
    };

    expect(() => {Validator.validatePutSite(req)}).toThrowError(ValidationError);
    expect(() => {Validator.validatePutSite(req)}).toThrowError("Site name must not be an empty String");
  });

  test('throws Error when latitude is missing', () => {
    const req = {
      "params": {
        "siteName": "Adelaide"
      },
      "body": {
        "longitude": 138
      }
    };

    expect(() => {Validator.validatePutSite(req)}).toThrowError(ValidationError);
    expect(() => {Validator.validatePutSite(req)}).toThrowError("Latitude must be a numerical value");
  });


  test('throws Error when latitude is non-numeric', () => {
    const req = {
      "params": {
        "siteName": "Adelaide"
      },
      "body": {
        "latitude": "someNonNumericString",
        "longitude": 138
      }
    };

    expect(() => {Validator.validatePutSite(req)}).toThrowError(ValidationError);
    expect(() => {Validator.validatePutSite(req)}).toThrowError("Latitude must be a numerical value");
  });

  test('throws Error when longitude is missing', () => {
    const req = {
      "params": {
        "siteName": "Adelaide"
      },
      "body": {
        "latitude": -38
      }
    };

    expect(() => {Validator.validatePutSite(req)}).toThrowError(ValidationError);
    expect(() => {Validator.validatePutSite(req)}).toThrowError("Longitude must be a numerical value");
  });


  test('throws Error when longitude is non-numeric', () => {
    const req = {
      "params": {
        "siteName": "Adelaide"
      },
      "body": {
        "latitude": -38,
        "longitude": "someNonNumericString"
      }
    };

    expect(() => {Validator.validatePutSite(req)}).toThrowError(ValidationError);
    expect(() => {Validator.validatePutSite(req)}).toThrowError("Longitude must be a numerical value");
  });
});