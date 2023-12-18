const { Op, QueryTypes } = require("sequelize");
// const { Book, sequelize } = require("../models");
// const { client } = require("./statistic.controller");

const {
  User,
  Voucher,
  Store,
  Amount_discount,
  Percentage_discount,
} = require("../models");

const getAll = async (req, res) => {
  const getVoucher = await Voucher.findAll();
  return res.status(201).json(getVoucher);
};

const createVoucher = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.username,
      },
    });
    const store = await Store.findOne({
      where: {
        userId: user.id,
      },
    });
    const {
      code_name,
      min_spend,
      quantity,
      description,
      max_usage,
      start_time,
      end_time,
      discount,
    } = req.body;
    const { type, value } = discount;
    const newVoucher = await Voucher.create({
      code: code_name,
      minSpend: min_spend,
      quantity,
      description,
      max_usage,
      start_time,
      end_time,
      storeId: store.id,
    });
    if(end_time <= start_time) {
      return res.status(400).json({message: "End date cannot be earlier than start date"})
    }
    if (type === "amount") {
      console.log("amount....");
      await Amount_discount.create({
        amount: value,
        voucherId: newVoucher.id,
      });
    } else {
      await Percentage_discount.create({
        percent: value,
        voucherId: newVoucher.id,
      });
    }
    return res
      .status(201)
      .json({ message: "Voucher create successfully", voucher: newVoucher });
  } catch (error) {
    console.log(error);
  }
};

const getVoucherByStoreId = async (req, res) => {
    const {storeId} = req.params;
    try {
      //const amount_discounts = await Amount_discount.findAll();
      //const percentage_discounts = await Percentage_discount.
      const vouchers = await Voucher.findAll({
        where: {
          storeId
        },
        include: [
          {
            model: Amount_discount
          },
          {
            model: Percentage_discount
          }
        ]
      })
      return res.status(200).json(vouchers);
    } catch (error) {
      console.log(error);
    }
}


module.exports = {
  getAll,
  createVoucher,
  getVoucherByStoreId
};
