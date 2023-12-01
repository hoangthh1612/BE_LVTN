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
        const {shop_name, description, phone_number} = req.body;
        await Store.create({
            shop_name,
            description,
            phone_number,
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

const getStoreByUsername = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.username
        }
    })
    if(!user) {
        res.status(401).json({
            message: "Unauthorizated"
        })
    }
    //console.log(user.id);
    try {
        const store = await Store.findOne({
            where: {
                userId: user.id
            }
        })
        res.status(200).json(store);    
    } catch (error) {
        console.log(error);
    }
}

module.exports = {create, getStoreByUsername}