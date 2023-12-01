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
    const products = await Product.findAll({
      where: {
        id: productIds,
      },
      include: Category,
    });
    const combine = await getProductDetail(products);
    res.status(200).json([...combine]);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
};

module.exports = {
  createLivestream,
  updateEndStream,
  getProductsByLivestremId,
};
