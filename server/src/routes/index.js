const { Router } = require("express");
const {
  getCountries,
  getCountryByID,
  getCountryByName,
  postActivity,
  getActivities,
  deleteActivity,
} = require("../controllers/index.controller");

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/s/:id", getCountryByID);
router.get("/countries/q", getCountryByName);

router.get("/activities", getActivities);
router.post("/activities", postActivity);
router.delete("/activities", deleteActivity);

module.exports = router;
