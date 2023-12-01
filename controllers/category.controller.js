const {Category} = require('../models');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(404).json({message: "Not found"})
    }
}

module.exports = { getAllCategories };