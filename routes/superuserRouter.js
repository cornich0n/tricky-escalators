const { Router } = require("express");
const SuperUser = require("../models/SuperUser");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/users", checkAuth({ transient: true }), async (req, res, next) => {
    if (req.SuperUser) {
        req.query.id = req.SuperUser.id;
    }
    const users = await SuperUser.findAll({
        where: req.query,
    });
    res.json(users);
});

router.use(checkAuth());

router.post("/users", async (req, res, next) => {
    try {
        res.status(201).json(await SuperUser.create(req.body));
    } catch (error) {
        next(error);
    }
});

router.get("/users/:id", async (req, res, next) => {
    if (req.SuperUser.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const SuperUser = await SuperUser.findByPk(parseInt(req.params.id));
    if (!SuperUser) res.sendStatus(404);
    else res.json(SuperUser);
});

router.put("/users/:id", async (req, res, next) => {
    try {
        const result = await SuperUser.destroy({
            where: {
                id: parseInt(req.params.id),
            },
        });
        const SuperUser = await SuperUser.create({
            ...req.body,
            id: parseInt(req.params.id),
        });

        res.status(result ? 200 : 201).json(SuperUser);
    } catch (e) {
        next(e);
    }
});

router.delete("/users/:id", async (req, res, next) => {
    const result = await SuperUser.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.sendStatus(result ? 204 : 404);
});

router.patch("/users/:id", async (req, res, next) => {
    try {
        const [nbUpdated] = await SuperUser.update(req.body, {
            where: {
                id: parseInt(req.params.id),
            },
            individualHooks: true,
        });
        const SuperUser = await SuperUser.findByPk(parseInt(req.params.id));
        if (SuperUser) {
            res.status(200).json(SuperUser);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
