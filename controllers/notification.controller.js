const {User} = require('../models');
const createNotification = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.username
        }
    })
    const {title, content, userId} = req.body;
}

module.exports = {createNotification}