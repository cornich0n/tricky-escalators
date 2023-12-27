const { Router } = require('express');
const Maintenance = require('../models/Maintenance');
const checkAuth = require('../middlewares/checkAuth');
const router = new Router();
const checkMaintenanceAccess = require('../middlewares/MaintenanceAccess');

router.use(checkMaintenanceAccess);
router.use(checkAuth());

router.get('/maintenances', async (req, res, next) => {
    if (req.Maintenance) {
        req.query.id = req.Maintenance.id;
    }
    const maintenances = await Maintenance.findAll({
        where: req.query,
    });
    res.json(maintenances);
});
router.post('/maintenances', async (req, res, next) => {
    try {
        res.status(201).json(await Maintenance.create(req.body));
    } catch (error) {
        next(error);
    }
});

router.get('/maintenances/:id', async (req, res, next) => {
    if (req.Maintenance.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const Maintenance = await Maintenance.findByPk(parseInt(req.params.id));
    if (!Maintenance) res.sendStatus(404);
    else res.json(Maintenance);
});

router.put('/maintenances/:id', async (req, res, next) => {
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

router.delete('/maintenances/:id', async (req, res, next) => {
    const result = await Maintenance.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.sendStatus(result ? 204 : 404);
});

router.get('/maintenances/:id/escalators', async (req, res, next) => {
    const Maintenance = await Maintenance.findByPk(parseInt(req.params.id));
    if (!Maintenance) return res.sendStatus(404);
    res.json(await Maintenance.getEscalators());
});

router.post('/maintenances/:id/escalators', async (req, res, next) => {
    const Maintenance = await Maintenance.findByPk(parseInt(req.params.id));
    if (!Maintenance) return res.sendStatus(404);
    await Maintenance.addEscalator(req.body.id);
    res.sendStatus(204);
});

module.exports = router;
