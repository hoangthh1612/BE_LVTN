const { Op, QueryTypes } = require("sequelize");
// const { Book, sequelize } = require("../models");
// const { client } = require("./statistic.controller");



const { Product, Category, Livestream_product, Voucher } = require("../models");

const getAll = async (req, res) => {
  const getVoucher = await Voucher.findAll();
  return res.status(201).json(getVoucher);
};

module.exports = {
  getAll,
};
