const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const loader = require("./src/config/loader");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    loader();
  })
  .catch((error) => console.error(error));
