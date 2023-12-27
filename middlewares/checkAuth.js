const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const dotenv = require("dotenv"); dotenv.config();

module.exports = ({ transient = false } = {}) =>
  async function checkAuth(req, res, next) {
    const headerValue = req.headers.authorization || req.headers.Authorization;
    if (!headerValue) return transient ? next() : res.sendStatus(401);
    const [type, token] = headerValue.split(/\s+/);
    if (type !== "Bearer") return transient ? next() : res.sendStatus(401);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findByPk(payload.userId);

    next();
  };
