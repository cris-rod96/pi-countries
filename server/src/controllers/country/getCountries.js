const { Country, Activity } = require("../../db.js");

// Exportamos una función que obtiene todos los países
module.exports = async (req, res) => {
  try {
    const countries = await Country.findAll({
      include: [Activity],
    });
    if (countries) {
      return res.status(200).json(countries);
    }
    return res.status(404).json({
      message: "NO COUNTRIES",
    });
  } catch ({ message }) {
    return res.status(500).json({
      message,
    });
  }
};
