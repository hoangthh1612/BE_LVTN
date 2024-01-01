const {User, Cart, Cart_product, Product_detail,ProductDetail_VariationOption,
     Variation_option, Variation, Product} = require('../models');

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
            id
        },
        include: Product
    })
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
    let name = await getVariationName(item?.variationId);
    add_variations.push({ ...item.dataValues, variation_name: name });
    }
    const combineVariation = skus_variation_options?.map((item) => {
    let result;
    for (const i of add_variations) {
        if (i.id === item.variationOptionId) {
        result = i;
        }
    }
    return { ...item.dataValues, variation_options: result };
    });
    return {...productDetail.dataValues, skus_variation_options: combineVariation}
}

const createCartProduct = async (req, res) => {
    const {productDetailId, quantity} = req.body;

    try {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        const cart = await Cart.findOne({
            where: {
                userId: user.id
            }
        })
        const productDetail = await Product_detail.findOne({
            where: {
                id: productDetailId
            }
        })
        const existedCartProduct = await Cart_product.findOne({
            where: {
                cartId: cart.id,
                productDetailId: productDetailId
            }
        })
        if(existedCartProduct) {
            existedCartProduct.quantity += quantity;
            await existedCartProduct.save();
            return res.status(201).json({message: "Add to cart successfully"});
        }
        if(quantity > productDetail.quantity) {
            return res.status(401).json({message: "Don't enough products in store"})
        }
        const newCartProduct = await Cart_product.create({
            cartId: cart.id,
            productDetailId,
            quantity
        })
        return res.status(201).json({message: "Add to cart successfully"});

    } catch (error) {
        console.log(error);
    }

}


const getCartProduct = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                //username: req.username
                username: req.username
            }
        })
        const cart = await Cart.findOne({
            where: {
                userId: user.id
            }
        })
        const cartProducts = await Cart_product.findAll({
            where: {
                cartId: cart.id
            },
            order: [['updatedAt', 'DESC']]
            // include: {
            //     model: Product_detail,
            //     include: ProductDetail_VariationOption
                
            // }
        })
        const productDetailIds = cartProducts?.map((item) => item?.productDetailId);
        // console.log(productDetailIds);
        
        let result = [];
        for(const item of cartProducts) {
            const productDetail = await getProductDetail(item?.productDetailId);
            result.push({
                ...item.dataValues,
                product_detail: productDetail
            }); 
        }
        
        //const productDetail = await getProductDetail(cartProduct.productDetailId);
        return res.status(200).json(result);
    }
    catch(err) {
        console.log(err);
    }

}

const removeProductFromCart = async (req, res) => {
    const {productDetailId} = req.params;
    try {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        const cart = await Cart.findOne({
            where: {
                userId: user.id
            }
        })
        // console.log(productDetailId);
        const cartProduct = await Cart_product.findOne({
            where: {
                productDetailId,
                cartId: cart.id 
            }
        })
        // console.log(cartProduct);
        if(!cartProduct) {
            return res.status(404).json({message: "Not Found"})
        }
        await cartProduct.destroy();
        return res.status(204).json({message: "Delete product from cart successfully"});
    } catch (error) {
        res.status(400).json({message: "Delete fail"})
    }
}

const updateProductFromCart = async (req, res) => {
    const {productDetailId} = req.params;
    const {quantity} = req.body;
    try {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        const cart = await Cart.findOne({
            where: {
                userId: user.id
            }
        })
        const cartProduct = await Cart_product.findOne({
            where: {
                productDetailId,
                cartId: cart.id 
            }
        })
        if(!cartProduct) {
            return res.status(404).json({message: "Not Found"})
        }
        cartProduct.quantity = quantity;
        await cartProduct.save();
        return res.status(204).json({message: "Update product from cart successfully"});
    } catch (error) {
        res.status(400).json({message: "Update fail"})
    }
}



module.exports = {getCartProduct, createCartProduct, removeProductFromCart, updateProductFromCart}