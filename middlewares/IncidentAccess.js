
const User = require('../models/Users');

const checkIncidentAccess = async (req, res, next) => {
    try {
        const userId = req.User.id;
        const user = await User.findByPk(userId);
        if (user && user.role === 'vandal') {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: '? Authorization ?' });
    }
};

module.exports = checkIncidentAccess;
