const { Op, QueryTypes } = require("sequelize");
// const { Book, sequelize } = require("../models");
// const { client } = require("./statistic.controller");

const {
  User,
  Voucher,
  Store,
  Amount_discount,
  Percentage_discount,
  Order,
  Order_voucher
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

const getNumsUsedVoucher = async (userId, voucherId) => {
  const orders = await Order.findAll({
    where: {
      userId
    },
    include: Order_voucher
  })
  let result = 0;
  for(const item of orders) {
    
    if(item.Order_vouchers?.length > 0) {
      
      if(item.Order_vouchers[0]?.voucherId === voucherId){
        // console.log("come on...");
        result += 1;
      }
      
    }
  }
  return result;
} 

const getVoucherByStoreId = async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.username
      }
    })
    const {storeId} = req.params;
    try {
      //const amount_discounts = await Amount_discount.findAll();
      //const percentage_discounts = await Percentage_discount.
      const currentDate = new Date();
    
      const vouchers = await Voucher.findAll({
        where: {
          storeId,
          start_time: {
            [Op.lte]: currentDate,
          },
          end_time: {
            [Op.gte]: currentDate
          },
          deleted: false
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
      let result = [];
      for(const item of vouchers) {
        // console.log(item.id);
        let num = await getNumsUsedVoucher(user.id, item.id);
        // console.log('num...', num);
        if(item.used > num) result.push(item);
      }
      return res.status(200).json(vouchers);
    } catch (error) {
      console.log(error);
    }
}

const getVoucherOfStore = async (req, res) => {
  
  try {
    //const amount_discounts = await Amount_discount.findAll();
    //const percentage_discounts = await Percentage_discount.
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
    const currentDate = new Date();
    
    const vouchers = await Voucher.findAll({
      where: {
        storeId: store.id,
        deleted: false

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

const deleteVoucher = async (req, res) => {
  const {voucherId} = req.params;
  try {
    const voucher = await Voucher.findOne({
      where: {
        id: voucherId
      }
    })
    voucher.deleted = true;
    await voucher.save();
    res.status(204).json({message: "Deleted voucher successfully"})
  } catch (error) {
    console.log(error);
  }
} 


module.exports = {
  getAll,
  createVoucher,
  getVoucherByStoreId,
  getVoucherOfStore,
  deleteVoucher
  // deleteVoucherOfStore,
};
