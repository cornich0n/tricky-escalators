const { Router } = require("express");
const Escalator = require("../models/Escalator");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/users", checkAuth({ transient: true }), async (req, res, next) => {
    if (req.Escalator) {
        req.query.id = req.Escalator.id;
    }
    const users = await Escalator.findAll({
        where: req.query,
    });
    res.json(users);
});

router.use(checkAuth());

router.post("/users", async (req, res, next) => {
    try {
        res.status(201).json(await Escalator.create(req.body));
    } catch (error) {
        next(error);
    }
});

router.get("/users/:id", async (req, res, next) => {
    if (req.Escalator.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const Escalator = await Escalator.findByPk(parseInt(req.params.id));
    if (!Escalator) res.sendStatus(404);
    else res.json(Escalator);
});

router.put("/users/:id", async (req, res, next) => {
    try {
        const result = await Escalator.destroy({
            where: {
                id: parseInt(req.params.id),
            },
        });
        const Escalator = await Escalator.create({
            ...req.body,
            id: parseInt(req.params.id),
        });

        res.status(result ? 200 : 201).json(Escalator);
    } catch (e) {
        next(e);
    }
});

router.delete("/users/:id", async (req, res, next) => {
    const result = await Escalator.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.sendStatus(result ? 204 : 404);
});

router.patch("/users/:id", async (req, res, next) => {
    try {
        const [nbUpdated] = await Escalator.update(req.body, {
            where: {
                id: parseInt(req.params.id),
            },
            individualHooks: true,
        });
        const Escalator = await Escalator.findByPk(parseInt(req.params.id));
        if (Escalator) {
            res.status(200).json(Escalator);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;