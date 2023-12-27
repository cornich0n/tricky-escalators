const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT ?? 3000;

const superuserRouter = require("./routes/superuserRouter");
const incidentRouter = require("./routes/incidentRouter");
const escalatorRouter = require("./routes/escalatorRouter");
const { ValidationError } = require("sequelize");
const User = require("./models/SuperUser");
const Escalator = require("./models/Escalator");
const Incident = require("./models/Incident");
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("La gadji c'est un paqueta!\n" + JSON.stringify(req.query));
});

app.use(superuserRouter);
app.use(incidentRouter);
app.use(escalatorRouter);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
