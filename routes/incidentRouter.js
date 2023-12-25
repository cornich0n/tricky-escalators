const { Router } = require("express");
const Incident = require("../models/Incident");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/users", checkAuth({ transient: true }), async (req, res, next) => {
    if (req.Incident) {
        req.query.id = req.Incident.id;
    }
    const users = await Incident.findAll({
        where: req.query,
    });
    res.json(users);
});

router.use(checkAuth());

router.post("/users", async (req, res, next) => {
    try {
        res.status(201).json(await Incident.create(req.body));
    } catch (error) {
        next(error);
    }
});

router.get("/users/:id", async (req, res, next) => {
    if (req.Incident.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const Incident = await Incident.findByPk(parseInt(req.params.id));
    if (!Incident) res.sendStatus(404);
    else res.json(Incident);
});

router.put("/users/:id", async (req, res, next) => {
    try {
        const result = await Incident.destroy({
            where: {
                id: parseInt(req.params.id),
            },
        });
        const Incident = await Incident.create({
            ...req.body,
            id: parseInt(req.params.id),
        });

        res.status(result ? 200 : 201).json(Incident);
    } catch (e) {
        next(e);
    }
});

router.delete("/users/:id", async (req, res, next) => {
    const result = await Incident.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.sendStatus(result ? 204 : 404);
});

router.patch("/users/:id", async (req, res, next) => {
    try {
        const [nbUpdated] = await Incident.update(req.body, {
            where: {
                id: parseInt(req.params.id),
            },
            individualHooks: true,
        });
        const Incident = await Incident.findByPk(parseInt(req.params.id));
        if (Incident) {
            res.status(200).json(Incident);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;