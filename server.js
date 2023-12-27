const express = require("express");
const PORT = process.env.PORT ?? 3000;
const UsersRouter = require("./routes/usersRouter");
const incidentRouter = require("./routes/incidentRouter");
const escalatorRouter = require("./routes/escalatorRouter");
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("La gadji c'est un paqueta!\n" + JSON.stringify(req.query));
});

app.use(UsersRouter);
app.use(incidentRouter);
app.use(escalatorRouter);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
