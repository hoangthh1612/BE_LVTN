const {
  Order,
  Order_detail,
  Product_detail,
  User,
  Variation,
  Variation_option,
  ProductDetail_VariationOption,
  Product,
  Store,
  Order_voucher,
  Cart,
  Cart_product
} = require("../models");

const getVariationName = async (variationId) => {
  const variation = await Variation.findOne({
    where: {
      id: variationId,
    },
  });
  return variation.type_name;
};

const getProductDetail = async (id) => {
  const productDetail = await Product_detail.findOne({
    where: {
      id,
    },
    include: Product,
  });
  const skus_variation_options = await ProductDetail_VariationOption.findAll({
    where: {
      productDetailId: productDetail.id,
    },
  });
  const variation_options = await Variation_option.findAll({
    where: {
      id: skus_variation_options?.map((item) => item.variationOptionId),
    },
  });
  let add_variations = [];
  for (const item of variation_options) {
    let name = await getVariationName(item.variationId);
    add_variations.push({ ...item.dataValues, variation_name: name });
  }
  const combineVariation = skus_variation_options.map((item) => {
    let result;
    for (const i of add_variations) {
      if (i.id === item.variationOptionId) {
        result = i;
      }
    }
    return { ...item.dataValues, variation_options: result };
  });
  return {
    ...productDetail.dataValues,
    skus_variation_options: combineVariation,
  };
};

const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: Order_detail
      },
      {
        model: Order_voucher
      }]
    });
    
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
};

const getOrderByUserId = async (req, res) => {
  const { type } = req.query;
  
  try {
    const user = await User.findOne({
      where: {
        username: req.username,
      },
    });
    
    const orders = await Order.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: User,
        },
        {
          model: Order_detail,
        },
      ],
    });
    let result = [];
    for (const order of orders) {
      let order_details = [];
      for (const item of order.Order_details) {
        let product_detail = await getProductDetail(item.productDetailId);
        order_details.push({ ...item.dataValues, product_detail });
      }
      result.push({ ...order.dataValues, Order_details: order_details });
    }
    // const result = orders?.map(order => {
    //     let order_details = [];
    //     for(const item of order.Order_details) {
    //         let product_detail = await getProductDetail(item.productDetailId);
    //     }
    //     return {
    //         ...order,

    //     }
    // })
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateQuantity = async (id, quantity) => {
  const productDetail = await Product_detail.findOne({
    where: {
      id,
    },
  });
  productDetail.quantity -= quantity;
  productDetail.sold += quantity;
  await productDetail.save();
  return productDetail;
};


const createOrder = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.username,
    },
  });
  const cart = await Cart.findOne({
    where: {
      userId: user.id
    }
  })
 
  const {
    order_store,
    total_price,
    shipping_address,
    order_status,
    payment_method,
    fullname,
    phone,
    voucher_info,
    storeId,
    shipping_fee,
    discount
  } = req.body;
  let order_sn = `${user.id}${storeId}` + `${Date.now().toString()}`;
  const {orderTotal, voucherId} = voucher_info;
  const newOrder = await Order.create({
    order_sn,
    fullname,
    phone,
    shipping_address,
    payment_method: payment_method==1? "cash":"vnpay",
    userId: user.id,
    total_price: total_price,
    shipping_fee: shipping_fee,
    discount: discount,


  })  
  if(voucherId) {
    const newVoucher = await Order_voucher.create({
      voucherId,
      orderId: newOrder.id
    })
  }
  for(const item of order_store) {
    await Order_detail.create({
      orderId: newOrder.id,
      productDetailId: item.productDetailId,
      quantity: item.quantity
    })
    await updateQuantity(item.productDetailId, item.quantity);

    if(item.cartId) {
      await Cart_product.destroy({
        where: {
          cartId: cart.id,
          productDetailId: item.productDetailId
        }
      })
    }
  }

  // for (const data of order_detail) {
  //   let order_sn = `${user.id}${data.storeId}` + `${Date.now().toString()}`;
  //   const newOrder = await Order.create({   
  //     order_sn: `${order_sn}`,
  //     total_price: data.total_price,
  //     shipping_address,
  //     payment_method: "cash",
  //     userId: user.id,
  //     fullname,
  //     phone,
  //   });
  //   let result = [];
  //   for (const item of data.order_store) {
  //     const newOrderDetail = await Order_detail.create({
  //       orderId: newOrder.id,
  //       productDetailId: item.productDetailId,
  //       quantity: item.quantity,
  //     });
  //     const update = await updateQuantity(item.productDetailId, item.quantity);
  //     console.log(update);
  //     await update.save();
  //     result.push(newOrderDetail);
  //   }
  // }
  return res.status(201).json({
    message: "Create Order successfully",
    // order: {
    //     ...newOrder.dataValues,
    //     order_details: result
    // }
  });
};

const getOrderByOrderSn = async (req, res) => {
  const {orderSn} = req.params;
  // console.log(req.params);
  // const user = await User.findOne({
  //   where: {
  //     username: req.username
  //   }
  // })
  try {
    const order = await Order.findOne({
      where: {
        order_sn: orderSn
      },
      include: [
        {
          model: User
        },
        {
          model: Order_detail,
        },
      ]
    })
    let order_details = [];
    for (const item of order.Order_details) {
      let product_detail = await getProductDetail(item.productDetailId);
      order_details.push({ ...item.dataValues, product_detail });
    }
    //result.push({ ...order.dataValues, Order_details: order_details });
    return res.status(200).json({...order.dataValues, Order_details: order_details, order: order} );
  } catch (error) {
    console.log(error);
  }
} 

const updateOrderStatus = async (req, res) => {
  const {orderSn, action} = req.query;
  const order = await Order.findOne({
    where: {
      order_sn: orderSn
    }
  })
  console.log(action);
  if(action === 'cancel') {
    // console.log("cancel");
    order.order_status = "CANCELLED";
  }
  else if(action === 'accept') {
    order.order_status = "WAITING_DELIVERY";
  }
  else if(action === 'delivery') {
    order.order_status = "DELIVERING";
  }
  await order.save();
  return res.status(204).json({message: "Update Order sucessfull"});
}


const getOrderStatus = (type) => {
    let order_status = null;
    if(type === 'pending') {
      order_status = "PENDING"
    }
    else if(type === 'waiting_delivery') { 
      order_status = "WAITING_DELIVERY"
    }
    else if(type === 'delivering') {
      order_status = "DELIVERING"
    }
    else if(type === 'completed') { 
      order_status = "COMPLETED"   
    }
    else if(type === 'cancelled') {  
      order_status = "CANCELLED" 
    }
  return order_status;
}


const getOrderByStoreId = async (req, res) => {
  const { type } = req.query;
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
    const orders = await Order.findAll({
      include: [
        {
          model: User
        },
        {
          model: Order_detail,
        },
      ]
    });
    

    let result = [];
    for (const order of orders) {
      let order_details = [];
      for (const item of order.Order_details) {
        let product_detail = await getProductDetail(item.productDetailId);
        order_details.push({ ...item.dataValues, product_detail });
      }
      result.push({ ...order.dataValues, Order_details: order_details });
    }
    // const result = orders?.map(order => {
    //     let order_details = [];
    //     for(const item of order.Order_details) {
    //         let product_detail = await getProductDetail(item.productDetailId);
    //     }
    //     return {
    //         ...order,

    //     }
    // })
  
    const filterOrders = result?.filter((item) => {
      if(item?.Order_details[0]?.product_detail?.Product?.storeId === store.id) {
        return true;
      }
      return false;
    })
    
    // console.log(type); 
    let order_status = getOrderStatus(type);
    const ordersByStatus = !order_status ? filterOrders : filterOrders?.filter(item => item.order_status === order_status);
    return res.status(200).json(ordersByStatus);
  } catch (error) {
    console.log(error);
  }
};

// get Order of store by status

module.exports = { getAll, createOrder, getOrderByUserId, getOrderByOrderSn, updateOrderStatus, getOrderByStoreId };
