const { Router } = require("express");
const {
  getCountries,
  getCountryByID,
  getCountryByName,
  postActivity,
  getActivities,
  deleteActivity,
} = require("../controllers/index.controller");

// Crear un router
const router = Router();

// Crear las rutas para los paises
router.get("/countries", getCountries);
router.get("/countries/s/:id", getCountryByID);
router.get("/countries/q", getCountryByName);

// Crear las rutas para las actividades
router.get("/activities", getActivities);
router.post("/activities", postActivity);
router.delete("/activities", deleteActivity);

module.exports = router;
