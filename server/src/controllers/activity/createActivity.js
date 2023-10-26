const { Activity } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    if (name && difficulty && season && countries && duration) {
      if (countries.length > 0) {
        const newActivity = await Activity.create(req.body);
        await newActivity.addCountry(countries);
        if (newActivity) {
          return res.status(200).json(newActivity);
        }
        return res.status(412).json({
          message: "Unknown error",
        });
      }
      return res.status(400).json({
        message: "Countries Missing",
      });
    }
    return res.status(400).json({
      message: "Data Missing",
    });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
