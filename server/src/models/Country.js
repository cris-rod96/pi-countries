const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo (o sea la tabla) de la base de datos
module.exports = (sequelize) => {
  sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
          len: {
            args: [3, 3],
            msg: "La ID de las countries debe ser de 3 letras",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      official_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: {
            args: true,
            msg: "La imagen de la bandera debe ser una URL",
          },

          isAnImage: (value) => {
            if (
              !["png", "svg", "jpg", "jpeg"].includes(value.split(".").pop())
            ) {
              throw new Error("El formato de la imagen es incorrecto");
            }
          },
        },
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              "Europe",
              "North America",
              "South America",
              "Oceania",
              "Africa",
              "Asia",
              "Antarctida",
            ],
          },
          msg: "El valor del continente ingresado es inválido",
        },
      },

      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      subregion: {
        type: DataTypes.STRING,
      },

      area: {
        type: DataTypes.FLOAT,
      },

      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
