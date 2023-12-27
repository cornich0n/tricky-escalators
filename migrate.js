const connection = require("./models/db");
require("./models/Users");

connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());
