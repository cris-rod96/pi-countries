const getCountries = require("./country/getCountries");
const getCountryByID = require("./country/getCountryByID");
const getCountryByName = require("./country/getCountryByName");
const postActivity = require("./activity/postActivity");
const getActivities = require("./activity/getActivities");
const deleteActivity = require("./activity/deleteActivity");
module.exports = {
  getCountries,
  getCountryByID,
  getCountryByName,
  postActivity,
  getActivities,
  deleteActivity,
};
