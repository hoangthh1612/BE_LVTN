const {User, Store, Follow} = require('../models');

const createFollow = async (req, res) => {
    
    const {storeId} = req.body;
    try {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        const newFollow = await Follow.create({
            userId: user.id,
            storeId
        })
        return res.status(201).json({message: "Create Follow successfull"})
    } catch (error) {
        return res.status(400).json({messsage: "error"})
    }
}

const getFollowsByStoreId = async (req, res) => {
    const {storeId} = req.params;
    try {
        const follows = await Follow.findAll({
            where: {
                storeId
            }
        })
        return res.status(200).json(follows);
    } catch (error) {
        return res.status(404).json({message: "Not found"})
    }
}

const getFollowsOfStore = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        const store = await Store.findOne({
            where: {
                userId: user.id
            }
        })
        const follows = await Follow.findAll({
            where: {
                storeId: store.id
            }
        })
        return res.status(200).json(follows);
    } catch (error) {
        console.log(error);   
    }
}

const unFollowFromUser = async (req, res) => {
    const {storeId} = req.params;
    try {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        const follow = await Follow.findOne({
            where: {
                userId: user.id,
                storeId
            }
        })
        await follow.destroy();
        return res.status(204).json({message: "Delete successfully"})        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {createFollow, getFollowsByStoreId, unFollowFromUser, getFollowsOfStore}