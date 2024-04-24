const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_URI } = require("./config/database.js");

const sequelize = new Sequelize(DB_URI.URI, DB_URI.CONFIG);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Obtengo los modelos del objeto sequelize
const { Country, Activity, Continent } = sequelize.models;
// Hago las relaciones entre los modelos
Activity.belongsToMany(Country, { through: "Countries_Activities" });
Country.belongsToMany(Activity, { through: "Countries_Activities" });

module.exports = {
  Country,
  Activity,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
