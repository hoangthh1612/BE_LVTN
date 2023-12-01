const { Op, QueryTypes } = require("sequelize");
// const { Book, sequelize } = require("../models");
// const { client } = require("./statistic.controller");
const {
  Product,
  User,
  Category,
  Livestream_product,
  Product_detail,
  Variation_option,
  ProductDetail_VariationOption,
  Variation,
  Store,
} = require("../models");

const getAll = async (req, res) => {
  // if (req.userRole == 1) {
  //   return res.status(401).json({ error: "you dont have permision" });
  // }
  const getProduct = await Product.findAll({
    include: Category,
  });
  const produt_detail = await Product_detail.findAll({
    productId: getProduct?.map((item) => item.id),
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

  const combine = getProduct.map((item) => {
    return {
      ...item.dataValues,
      product_detail: combineProductDetail.filter(
        (i) => i.productId === item.id
      ),
    };
  });
  return res.status(201).json([...combine]);
};

// ------------------------SELLER---------------------------//

// get Product by storeid

const getProductByStoreId = async (req, res) => {
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
  const products = await Product.findAll({
    where: {
      storeId: store.id,
    },
  });
  return res.status(200).json(products);
};


// -> Create new product (POST)
const createProduct = async (req, res) => {
  const { product_name, description, brand, category } = req.body;
  // check if product_name is already exist
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

  const products = await Product.findAll({
    where: {
      storeId: store.id,
    },
  });
  console.log(products);
  const products_name = products?.map((item) => item.product_name);
  if (products_name?.includes(product_name)) {
    return res
      .status(404)
      .json({ message: "Product name already existed in store" });
  }

  const cate = Category.findOne({
    where: {
      category_name: category,
    },
  });

  const newProduct = await Product.create({
    product_name: product_name,
    description: description,
    brand: brand,
    categoryId: cate.id,
    storeId: store.id,
  });
  return res.status(201).json({ message: "Create product successfully" });

  // return res.status(201).json(newProduct);
};

const createProductNotVariation = async (req, res) => {
  const { basic_info, sales_info } = req.body;
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

  const products = await Product.findAll({
    where: {
      storeId: store.id,
    },
  });
  console.log(products);
  const products_name = products?.map((item) => item.product_name);
  if (
    products_name?.findIndex((name) => name === basic_info?.product_name) !== -1
  ) {
    return res
      .status(404)
      .json({ message: "Product name already existed in store" });
  }
  console.log(basic_info);
  const cate = await Category.findOne({
    where: {
      category_name: basic_info.category
    },
  });

  const product = await Product.create({
    image: basic_info.image,
    product_name: basic_info.product_name,
    description: basic_info.description,
    brand: basic_info.brand,
    categoryId: cate.id,
    storeId: store.id,
  });
  const product_detail = await Product_detail.create({
    price: sales_info.price,
    quantity: sales_info.quantity,
    productId: product.id,
  });

  return res.status(201).json({ message: "Product created successfully" });
};
const createProductVariation = async (req, res) => {
  const { basic_info, sales_info } = req.body;
  const { variations, models } = sales_info;

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

  const products = await Product.findAll({
    where: {
      storeId: store.id,
    },
  });
  //console.log(products);
  const products_name = products?.map((item) => item.product_name);
  if (
    products_name?.findIndex((name) => name === basic_info?.product_name) !== -1
  ) {
    return res
      .status(404)
      .json({ message: "Product name already existed in store" });
  }

  const cate = await Category.findOne({
    where: {
      category_name: basic_info.category
    },
  });

  const product = await Product.create({
    image: basic_info.image,
    product_name: basic_info.product_name,
    description: basic_info.description,
    brand: basic_info.brand,
    categoryId: cate.id,
    storeId: store.id,
  });
  //let skusId = []
  // variationsIds = [{id: number, option_name: ""}]
  console.log(variations);
  async function createVariationsAndOptions() {
    let variationIds = [];
    for (const item of variations) {
      const variation = await Variation.create({
        type_name: item.name,
        description: item.description,
      });
      const variationId = variation.id;

      for (const option of item.option_list || []) {
        const variation_option = await Variation_option.create({
          variationId,
          type_value: option.option_value,
        });
        variationIds.push({
          id: variation_option.id,
          option_value: variation_option.type_value,
        });
        console.log(variation_option.id);
      }
    }
    
    console.log(variationIds);
    for (const model of models) {
      let ids = [];
      model.tier_name.forEach((name) => {
        const variation_option = variationIds.find(
          (option) => name === option.option_value
        );
        ids.push(variation_option?.id);
      });
      console.log(ids);
      const sku = await Product_detail.create({
        productId: product.id,
        price: model.price,
        quantity: model.quantity,
      });
      ids.forEach(async (optionId, index) => {
        await ProductDetail_VariationOption.create({
          productDetailId: sku.id,
          variationOptionId: optionId,
        });
      });
    }
  }
  createVariationsAndOptions();
  // models?.forEach(async (model, index) => {
  //   let ids = []
  //   model.tier_name.forEach((name) => {
  //     let variation_option = variationIds.filter(option => name === option.option_value)
  //     ids.push(variation_option?.id);
  //   })
  //   const sku = await Product_detail.create({
  //     productId: product.id,
  //     price: model.price,
  //     quantity: model.quantity
  //   })
  //   console.log(ids);
  //   ids.forEach(async (optionId, index) => {
  //     await ProductDetail_VariationOption.create({
  //       productDetailId: sku.id,
  //       variationOPtionId: optionId
  //     })
  //   })
  // })
 

  return res.status(201).json({ message: "Product variations created successfully" });
};
// -> Update product (PUT)
const updateProduct = async (req, res) => {
  const {
    product_name,
    description,
    brand,
    discount_value,
    image,
    inLivestream,
    categoryId,
    storeId,
  } = req.body;

  const updateProduct = await Product.update(
    {
      product_name: product_name,
      description: description,
      brand: brand,
      discount_value: discount_value,
      image: image,
      inLivestream: inLivestream,
      categoryId: categoryId,
      storeId: storeId,
    },
    {
      where: {
        product_name: product_name,
      },
    }
  )
    .then((product) => {
      res.status(200).send("updated product successfully");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// -> Delete product  (DELETE)
const deleteProduct = async (req, res) => {
  const { product_name } = req.body;
  const deleteProduct = await Product.destroy({
    where: {
      product_name: product_name,
    },
  })
    .then((product) => {
      res.status(200).send("deleted product successfully");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// -> Get all product of store
const getAllProductOfStore = async (req, res) => {
  const { storeId } = req.body;
  const getAllProductOfStore = await Product.findAll({
    where: {
      storeId: storeId,
    },
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// -> Get product by id product
const getProductById = async (req, res) => {
  const { productId } = req.body;
  const getProductById = await Product.findOne({
    where: {
      productId: productId,
    },
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//////////////////////////----XEM LẠI----//////////////////////////

// -> Get best seller product of store
const getBestSellerProductOfStore = async (req, res) => {
  const { storeId } = req.body;
  const getBestSellerProductOfStore = await Product.findAll({
    where: {
      storeId: storeId,
    },
    order: [["numOfSell", "DESC"]],
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// -> Get product by category
const getProductByCategory = async (req, res) => {
  const { categoryId } = req.body;
  const getProductByCategory = await Product.findAll({
    where: {
      categoryId: categoryId,
    },
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// -> Get product by livestream

// -> Get product recommendation

// -> Get product by search

// -------------------------------BUYER-----------------------------//

// -> Get all product

const getAllProduct = async (req, res) => {
  const getAllProduct = await Product.findAll();
  return res.status(201).json(getAllProduct);
};

// -> Get product by id product
// const getProductById = async (req, res) => {
//   const { productId } = req.body;
//   const getProductById = await Product.findOne({
//     where: {
//       productId: productId,
//     },
//   })
//   .then((product) => {
//     res.status(200).send(product);
//   })
//   .catch((err) => {
//     res.status(500).send({ message: err.message });
//   });
// };

// -> Get best seller product

// -> Get product by category

// -> Get product by livestream

// -> Get product recommendation

// -> Get product by search

// -> Create review product (POST)

// -> Update review product (PUT)

// -> Delete review product (DELETE)

// -> Get review product by id product

// -> Get review product by id review

// -> Get review product by id account

module.exports = {
  getAll,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByStoreId,
  createProductVariation,
  createProductNotVariation,
};