const getCountries = require("./country/getCountries");
const getCountryByID = require("./country/getCountryByID");
const getCountryByName = require("./country/getCountryByName");
const postActivity = require("./activity/createActivity");
const getActivities = require("./activity/getActivities");
module.exports = {
  getCountries,
  getCountryByID,
  getCountryByName,
  postActivity,
  getActivities,
};
