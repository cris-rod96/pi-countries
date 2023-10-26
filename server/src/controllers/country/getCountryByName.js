const { Op } = require("sequelize");
const { Country } = require("../../db");
// Exportamos una función que obtiene un país por nombre
module.exports = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      if (country.length > 0) {
        return res.status(200).json(country);
      }
      return res.status(404).json({
        message: "Country/ies not found",
      });
    }
    return res.status(400).json({
      message: "Missing name",
    });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
//  GET | /countries/name?="..."
