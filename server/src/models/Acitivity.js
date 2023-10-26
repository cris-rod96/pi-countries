const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Activity", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    duration: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    season: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Verano", "Otoño", "Invierno", "Primavera"],
    },
  });
};
