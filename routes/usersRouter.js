const { Router } = require("express");
const Users = require("../models/Users");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv"); dotenv.config();

router.get("/users", checkAuth({ transient: true }), async (req, res, next) => {
    if (req.Users) {
        req.query.id = req.Users.id;
    }
    const users = await Users.findAll({
        where: req.query,
    });
    res.json(users);
});

router.post("/users", async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            return res.status(409).json({
                message: "non non non l'utilisateur existe déjà mon loulou",
            });
        }
        res.status(201).json(await Users.create(req.body));
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

router.use(checkAuth());

router.get("/users/:id", async (req, res, next) => {
    if (req.Users.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const Users = await Users.findByPk(parseInt(req.params.id));
    if (!Users) res.sendStatus(404);
    else res.json(Users);
});

router.put("/users/:id", async (req, res, next) => {
    try {
        const result = await Users.destroy({
            where: {
                id: parseInt(req.params.id),
            },
        });
        const Users = await Users.create({
            ...req.body,
            id: parseInt(req.params.id),
        });
        res.status(result ? 200 : 201).json(Users);
    } catch (e) {
        next(e);
    }
});

router.delete("/users/:id", async (req, res, next) => {
    const result = await Users.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.sendStatus(result ? 204 : 404);
});

router.patch("/users/:id", async (req, res, next) => {
    try {
        const [nbUpdated] = await Users.update(req.body, {
            where: {
                id: parseInt(req.params.id),
            },
            individualHooks: true,
        });
        const Users = await Users.findByPk(parseInt(req.params.id));
        if (Users) {
            res.status(200).json(Users);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: "l'utilisateur n'existe pas",
            });
        }
        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passwordValid) {
            return res.status(401).json({
                message: "le mot de passe est incorrect",
            });
        }
        const token = jwt.sign(
            {
                userId: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );
        res.json({
            token,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

router.get("/logout", (req, res, next) => {
    res.json({
        message: "logout",
    });
});

module.exports = router;
