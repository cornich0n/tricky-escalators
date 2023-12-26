const { Router } = require("express");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/users", checkAuth({ transient: true }), async (req, res, next) => {
    if (req.Maintenance) {
        req.query.id = req.Maintenance.id;
    }
    const users = await Maintenance.findAll({
        where: req.query,
    });
    res.json(users);
});

router.use(checkAuth());

router.post("/users", async (req, res, next) => {
    try {
        res.status(201).json(await Maintenance.create(req.body));
    } catch (error) {
        next(error);
    }
});

router.get("/users/:id", async (req, res, next) => {
    if (req.Maintenance.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const Maintenance = await Maintenance.findByPk(parseInt(req.params.id));
    if (!Maintenance) res.sendStatus(404);
    else res.json(Maintenance);
});

router.put("/users/:id", async (req, res, next) => {
    try {
        const result = await Maintenance.destroy({
            where: {
                id: parseInt(req.params.id),
            },
        });
        const Maintenance = await Maintenance.create({
            ...req.body,
            id: parseInt(req.params.id),
        });

        res.status(result ? 200 : 201).json(Maintenance);
    } catch (e) {
        next(e);
    }
});

router.delete("/users/:id", async (req, res, next) => {
    const result = await Maintenance.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.sendStatus(result ? 204 : 404);
});

router.patch("/users/:id", async (req, res, next) => {
    try {
        const [nbUpdated] = await Maintenance.update(req.body, {
            where: {
                id: parseInt(req.params.id),
            },
            individualHooks: true,
        });
        const Maintenance = await Maintenance.findByPk(parseInt(req.params.id));
        if (Maintenance) {
            res.status(200).json(Maintenance);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
