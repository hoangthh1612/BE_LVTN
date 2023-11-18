const {Store, User, User_role} = require('../models');

const create = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.username
        }
    })
    if(!user) {
        res.status(401).json({message: "Unauthozirated"});
    }
    try {
        const {description, phone_number, address, avatar} = req.body;
        await Store.create({
            description,
            phone_number,
            address,
            avatar,
            userId: user.id
        })
        await User_role.create({
            userId: user.id,
            roleId: 2
        })
        
        return res.status(201).json({message: "Store created successfully"})
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {create}