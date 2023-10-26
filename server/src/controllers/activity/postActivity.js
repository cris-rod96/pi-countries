const { Activity } = require("../../db");

// Exportamos una función que crea una actividad
module.exports = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    if (name && difficulty && season && countries && duration) {
      if (countries.length > 0) {
        const activity = await Activity.findOne({
          where: { name },
        });

        if (!activity) {
          const newActivity = await Activity.create(req.body);
          await newActivity.addCountry(countries);

          return newActivity
            ? res.status(200).json(newActivity)
            : res.status(400).json({ message: "Activity not created" });
        }
        return res.status(400).json({
          message: "Activity already exists",
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
