require("dotenv").config();
const { POSTGRES_URI_LOCAL, POSTGRES_URI_DEPLOY, NODE_ENV } = process.env;

const DB_URI = NODE_ENV
  ? {
      URI: POSTGRES_URI_DEPLOY,
      CONFIG: {
        logging: false,
        native: false,
        dialectOptions: {
          ssl: {
            require: true,
          },
        },
      },
    }
  : {
      URI: POSTGRES_URI_LOCAL,
      CONFIG: {
        logging: false,
        native: false,
      },
    };
// Exporto las variables de entorno para usarlas en la conexión a la base de datos

module.exports = { DB_URI };
