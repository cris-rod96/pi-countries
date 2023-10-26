const { Activity, Country } = require("../../db");

// Exportamos una función que obtiene todas las actividades
module.exports = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [Country],
    });

    return activities.length > 0
      ? res.status(200).json(activities)
      : res.status(204).json({ message: "No Activities" });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
