const { Router } = require("express");
const {
  getCountries,
  getCountryByID,
  getCountryByName,
  postActivity,
  getActivities,
} = require("../controllers/index.controller");

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/s/:id", getCountryByID);
router.get("/countries/q", getCountryByName);

router.get("/activities", getActivities);
router.post("/activities", postActivity);

module.exports = router;
