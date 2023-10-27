const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Continent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countries: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
