const connection = require("./models/db");
require("./models/SuperUser");

connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());
