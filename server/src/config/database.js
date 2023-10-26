require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
};
