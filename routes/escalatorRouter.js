const { Router } = require("express");
const Escalator = require("../models/Escalator");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/escalators", checkAuth({ transient: true }), async (req, res, next) => {
    if (req.SuperUser) {
        req.query.id = req.SuperUser.id;
    }
    const escalators = await Escalator.findAll({
        where: req.query,
    });
    res.json(escalators);
});

router.use(checkAuth());

router.post("/escalators", async (req, res, next) => {
    try {
        res.status(201).json(await Escalator.create(req.body));
    } catch (error) {
        next(error);
    }
});

router.get("/escalators/:id", async (req, res, next) => {
    if (req.SuperUser.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const Escalator = await Escalator.findByPk(parseInt(req.params.id));
    if (!Escalator) res.sendStatus(404);
    else res.json(Escalator);
});

router.put("/escalators/:id", async (req, res, next) => {
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

router.delete("/escalators/:id", async (req, res, next) => {
    const result = await Escalator.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.sendStatus(result ? 204 : 404);
});

router.get("/escalators/:id/incidents", async (req, res, next) => {
    const Escalator = await Escalator.findByPk(parseInt(req.params.id));
    if (!Escalator) return res.sendStatus(404);
    res.json(await Escalator.getIncidents());
});

router.post("/escalators/:id/incidents", async (req, res, next) => {
    const Escalator = await Escalator.findByPk(parseInt(req.params.id));
    if (!Escalator) return res.sendStatus(404);
    const incident = await Incident.findByPk(req.body.id);
    if (!incident) return res.sendStatus(404);
    await Escalator.addIncident(incident);
    res.sendStatus(201);
});

module.exports = router;
