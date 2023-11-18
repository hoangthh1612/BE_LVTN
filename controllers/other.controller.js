const { Op, QueryTypes } = require("sequelize");
// const { Book, sequelize } = require("../models");
// const { client } = require("./statistic.controller");
const { Product, Category, Livestream_product, User, User_role, Role } = require("../models");
const { get } = require("../services/auth.service");


const getAllCategory = async (req, res) => {
    const getAllCategory = await Category.findAll();
    return res.status(201).json(getAllCategory);
    }

    module.exports = {
        getAllCategory
    }
