const { Router } = require('express');
const Incident = require('../models/Incident');
const Escalator = require('../models/Escalator');
const checkAuth = require('../middlewares/checkAuth');
const router = new Router();

router.get('/incidents', checkAuth({ transient: true }), async (req, res, next) => {
    if (req.Users) {
        req.query.id = req.Users.id;
    }
    const incidents = await Incident.findAll({
        where: req.query,
    });
    res.json(incidents);
});

router.use(checkAuth());

router.post('/incidents', async (req, res, next) => {
    try {
        res.status(201).json(await Incident.create(req.body));
    } catch (error) {
        next(error);
    }
});

router.get('/incidents/:id', async (req, res, next) => {
    if (req.Incident.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const Incident = await Incident.findByPk(parseInt(req.params.id));
    if (!Incident) res.sendStatus(404);
    else res.json(Incident);
});

router.put('/incidents/:id', async (req, res, next) => {
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

router.delete('/incidents/:id', async (req, res, next) => {
    const result = await Incident.destroy({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.sendStatus(result ? 204 : 404);
});

router.get('/incidents/:id/escalators', async (req, res, next) => {
    const Incident = await Incident.findByPk(parseInt(req.params.id));
    if (!Incident) return res.sendStatus(404);
    const escalators = await Incident.getEscalators();
    res.json(escalators);
});

router.post('/incidents/:id/escalators', async (req, res, next) => {
    const Incident = await Incident.findByPk(parseInt(req.params.id));
    if (!Incident) return res.sendStatus(404);
    const escalator = await Escalator.findByPk(req.body.id);
    if (!escalator) return res.sendStatus(404);
    await Incident.addEscalator(escalator);
    res.sendStatus(204);
});

router.delete('/incidents/:id/escalators/:escalatorId', async (req, res, next) => {
    const Incident = await Incident.findByPk(parseInt(req.params.id));
    if (!Incident) return res.sendStatus(404);
    const escalator = await Escalator.findByPk(req.params.escalatorId);
    if (!escalator) return res.sendStatus(404);
    await Incident.removeEscalator(escalator);
    res.sendStatus(204);
});

module.exports = router;
