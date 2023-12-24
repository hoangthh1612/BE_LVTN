const {Category, User, Product, Store} = require('../models');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(404).json({message: "Not found"})
    }
}

const getCategoryOfStore = async (req, res) => {
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
        //const {storeId} = req.params;
        const products = await Product.findAll({
            where: {
                storeId: store.id
            }
        })
        const categoryIds = products?.map(item => item.categoryId);
        const ids = [...new Set(categoryIds)];
        const categories = await Category.findAll({
            where: {
                id: ids
            }
        })
        return res.status(200).json(categories);

    } catch (error) {
        console.log(error);
    }
}

const getCategoryByCategoryName = async (req, res) => {
    try {
        const {categoryName} = req.query;
        const category = await Category.findOne({
            where: {
                category_name: categoryName
            }
        })
        res.status(200).json(category);

    } catch (error) {
        console.log(error);
    }
}



module.exports = { getAllCategories, getCategoryOfStore, getCategoryByCategoryName };