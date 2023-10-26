require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
// Exporto las variables de entorno para usarlas en la conexión a la base de datos
module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
};
