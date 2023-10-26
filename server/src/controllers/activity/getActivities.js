const { Activity, Country } = require("../../db");

module.exports = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [Country],
    });

    if (activities.length > 0) {
      return res.status(200).json(activities);
    }
    return res.status(404).json({ message: "No Activities" });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
