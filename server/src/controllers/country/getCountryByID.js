const { Country } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const country = await Country.findOne({
        where: {
          id,
        },
      });

      if (country) {
        return res.status(200).json(country);
      }
      return res.status(404).json({
        message: "Country not found",
      });
    }
    return res.status(400).json({
      message: "Missing ID",
    });
  } catch ({ message }) {
    return res.status(500).json({
      message,
    });
  }
};
