const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT ?? 3000;

const userRouter = require("./routes/superuserRouter");
const { ValidationError } = require("sequelize");
const User = require("./models/SuperUser");
const Escalator = require("./models/Escalator");
const Incident = require("./models/Incident");
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("Hello World!" + JSON.stringify(req.query));
});

app.use(userRouter);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
