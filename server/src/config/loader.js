const { data } = require("../../api/db");
const { Country } = require("../db");

// Exportamos una función que obtiene todos los países de la API y los carga en la base de datos
module.exports = async () => {
  try {
    const countries = data.map((country) => ({
      id: country.cca3,
      name: country.name.common,
      official_name: country.name.official,
      flag: country.flags.svg,
      capital: country.capital ? country.capital[0] : "No Data",
      continent: country.continents[0],
      subregion: country.subregion ? country.subregion : "No Data",
      area: country.area,
      population: country.population,
    }));
    await Country.bulkCreate(countries);
  } catch ({ message }) {
    throw new Error(message);
  }
};
