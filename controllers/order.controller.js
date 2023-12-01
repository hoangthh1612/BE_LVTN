const { Order } = require('../models');
const {Order_detail, Product_detail} = require('../models');

const getAll = async (req, res) => {
    
    try {
        const orders = await Order.findAll();
        const order_details = await Order_detail.findAll({
            id: orders
        })
        return res.status(200).json(orders);
    }
    catch(err) {
        console.log(err);
    }
}
// const getOrdersFilterBy = async (req, res) => {
    
//     const orders = await Order.getAll({
        
//     })
// }

module.exports = {getAll}