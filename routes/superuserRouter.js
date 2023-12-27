const { Router } = require("express");
const Users = require("../models/Users");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

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
        res.status(201).json(await Users.create(req.body));
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

// router.use(checkAuth());

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

module.exports = router;
