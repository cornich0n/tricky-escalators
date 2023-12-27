
const User = require('../models/Users');

const checkMaintenanceAccess = async (req, res, next) => {
    try {
        const userId = req.User.id;
        const user = await User.findByPk(userId);
        if (user && user.role === 'tech') {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: '? Authorization ?' });
    }
};

module.exports = checkMaintenanceAccess;
