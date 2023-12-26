const {
  Livestream,
  Livestream_product,
  Product,
  Category,
  Product_detail,
  ProductDetail_VariationOption,
  Variation,
  Variation_option,
} = require("../models");
const sequelize = require("sequelize");

const getVariationName = async (variationId) => {
  const variation = await Variation.findOne({
    where: {
      id: variationId,
    },
  });
  return variation.type_name;
};

const getProduct = async (productId) => {
  const product = await Product.findOne({
    where: {
      id: productId,
    },
    include: Category,
  });
  const product_details = await Product_detail.findAll({
    where: {
      productId,
    },
  });
  // const getProduct = {
  //   ...product,
  //   product_detail: product_details
  // }
  const productDetailIds = product_details?.map((item) => item.id);
  const skus_variation_options = await ProductDetail_VariationOption.findAll({
    where: {
      productDetailId: productDetailIds,
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
  // console.log(add_variations);
  const combineVariation = skus_variation_options?.map((item) => {
    let result = {};
    for (const i of add_variations) {
      if (i.id === item.variationOptionId) {
        result = i;
      }
    }
    return { ...item.dataValues, variation_options: result };
  });
  const combine = product_details?.map((item) => {
    let result = [];
    for (const i of combineVariation) {
      if (i.productDetailId === item.id) {
        result.push({ ...i });
      }
    }
    return {
      ...item.dataValues,
      skus_variation_options: result,
    };
  });
  const variationIds = combine[0].skus_variation_options?.map(item => item.variation_options.variationId);
  
  let variations = [];
  for(const id of variationIds) {
    const variation = await Variation.findByPk(id);
    const variation_options = await Variation_option.findAll({
      where: {
        variationId: id
      }
    })
    variations.push({...variation.dataValues, variation_options});
  }

  return { ...product.dataValues, product_details: combine, variations };
};




const createLivestream = async (req, res) => {
  const { title, thumbnail, description, roomId, storeId, products } = req.body;
  try {
    const livestream = await Livestream.create({
      title,
      thumbnail,
      description,
      roomId,
      storeId,
    });
    for (const item of products) {
      await Livestream_product.create({
        livestreamId: livestream.id,
        productId: item.id,
        orderInLive: item.orderInLive,
        expectedSell: item.expectedSell,
      });
    }

    res.status(201).json({ message: "Create livestream successfully" });
  } catch (error) {
    console.log(error);
  }
};

const updateEndStream = async (req, res) => {
  const { storeId } = req.params;
  try {
    const existedLive = await Livestream.findOne({
      where: {
        storeId,
        inLive: true,
      },
    });
    // existedLive.end_time = DataTypes.NOW;
    // existedLive.inLive = false;
    await existedLive.update({
      end_time: sequelize.literal("current_timestamp"),
      inLive: false,
    });
    await existedLive.save();
    res.status(201).json({ message: "Update Livestream successfully" });
  }
  catch(err) {
    res.status(404).json({message: "Not found"})
  }
};

const getProductDetail = async (products) => {
  const produt_detail = await Product_detail.findAll({
    productId: products?.map((item) => item.id),
  });
  const productDetail_VariationOption =
    await ProductDetail_VariationOption.findAll({
      productDetailId: produt_detail?.map((item) => item.id),
    });
  const variation_option = await Variation_option.findAll(
    {
      include: Variation,
    },
    {
      id: productDetail_VariationOption?.map((item) => item.variationOptionId),
    }
  );
  const combineVariation = productDetail_VariationOption.map((item) => {
    return {
      ...item.dataValues,
      variation_option: variation_option.filter(
        (i) => i.id === item.variationOptionId
      ),
    };
  });
  const combineProductDetail = produt_detail.map((item) => {
    return {
      ...item.dataValues,
      productDetail_VariationOption: combineVariation.filter(
        (i) => i.productDetailId === item.id
      ),
    };
  });

  const combine = products.map((item) => {
    return {
      ...item.dataValues,
      product_detail: combineProductDetail.filter(
        (i) => i.productId === item.id
      ),
    };
  });
  return combine;
};

const getProductsByLivestremId = async (req, res) => {
  const { storeId } = req.params;
  try {
    const livestream = await Livestream.findOne({
      where: {
        storeId,
        inLive: true,
      },
    });
    const livestreamProduct = await Livestream_product.findAll({
      where: {
        livestreamId: livestream?.id,
      },
    });
    const productIds = livestreamProduct.map((item) => item.productId);
    const result = [];
  for(const productId of productIds) {
    const product = await getProduct(productId);
    result.push(product);
  }  
  res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
};

// get Livestream in live

const getLivestream = async (req, res) => {
  const {roomId} = req.params;
  const livestream = await Livestream.findOne({
    where: {
      roomId,
      inLive: true
    }
  })
  return res.status(200).json(livestream);
}

module.exports = {
  createLivestream,
  updateEndStream,
  getProductsByLivestremId,
  getLivestream
};
