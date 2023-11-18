const { Category, Product, Role, User, Store, Follow, Cart, Cart_product, Admin,
  Cart_detail, Voucher, Feedback, Product_detail, Livestream_product, Livestream, Order_detail, Order, User_role, Percentage_discount,
  Amount_discount, Product_review, Order_voucher, Variation, Variation_option, ProductDetail_VariationOption } = require('../models');


function initial() {

  // Thêm roles
  Role.create({
    // id: 1,
    role_name: "buyer",
  })

  Role.create({
    // id: 2,
    role_name: "seller",
  })

  Role.create({
    // id: 3,
    role_name: "admin",
  })

  // Thêm categorys
  Category.create({
    // id: 1,
    category_name: "Thời Trang",
    description: "Danh mục thời trang",
    image: "https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
  })
  Category.create({
    // id: 2,
    category_name: "Điện tử",
    description: "Danh mục thiết bị điện tử",
    image: "https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5_tn"
  })

  Category.create({
    // id: 3,
    category_name: "Máy tính",
    description: "Danh mục máy tính & Laptop",
    image: "https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d_tn"
  })

  Category.create({
    // id: 4,
    category_name: "Đồng hồ",
    description: "Danh mục đồng hồ",
    image: "https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn"
  })

  Category.create({
    // id: 5,
    category_name: "Nhà sách",
    description: "Danh mục nhà sách",
    image: "https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139_tn"
  })

  Category.create({
    // id: 6,
    category_name: "Gia dụng",
    description: "Danh mục thiết bị gia dụng",
    image: "https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857_tn"
  })

  Category.create({
    // id: 7,
    category_name: "Máy ảnh",
    description: "Danh mục máy ảnh và máy quay phim",
    image: "https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d_tn"
  })

  Category.create({
    // id: 8,
    category_name: "Sắc đẹp",
    description: "Danh mục sắc đẹp",
    image: "https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72_tn"
  })

  Category.create({
    // id: 9,
    category_name: "Túi xách",
    description: "Danh mục túi xách",
    image: "https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52_tn"
  })

  Category.create({
    // id: 10,
    category_name: "Sức khỏe",
    description: "Danh mục sức khỏe",
    image: "https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747_tn"
  })

  /////////////////////////////////////////////


  Variation.create({
    type_name: "Size",
    description: "Size của sản phẩm"
  })

  Variation.create({
    type_name: "Color",
    description: "Màu sắc của sản phẩm"
  })

  //////////////////////////////////////////////

Variation_option.create({
  type_value: "S",
  variationId: 1,
})

Variation_option.create({
  type_value: "M",
  variationId: 1,
})

Variation_option.create({
  type_value: "L",
  variationId: 1,
})


Variation_option.create({
  type_value: "Đen",
  variationId: 2,
})

Variation_option.create({
  type_value: "Trắng",
  variationId: 2,
})

Variation_option.create({
  type_value: "Đỏ",
  variationId: 2,
})


  //////////////////////////////////////////////

  // Thêm user--> Có 6 user: 1,2,3 có role vừa bán vừa mua, useId: 4,5,6 chỉ có role người mua
  User.create({
    // id: 1,
    username: "buyer01",
    password: "123456",
    fullname: "Nguyễn Văn A",
    email: "buy01@gmail.com",
    phone_number: "0337510001",
    address: "Hồ Chí Minh city",
  })

  User.create({
    // id: 2,
    username: "buyer02",
    password: "123456",
    fullname: "Nguyễn Văn B",
    email: "buy02@gmail.com",
    phone_number: "0337510002",
    address: "Sài Gòn city",
  })

  User.create({
    // id: 3,
    username: "buyer03",
    password: "123456",
    fullname: "Nguyễn Văn C",
    email: "buy03@gmail.com",
    phone_number: "0337510003",
    address: "Thủ Đức city",
  })

  User.create({
    // id: 4,
    username: "buyer04",
    password: "123456",
    fullname: "Nguyễn Văn D",
    email: "buy04@gmail.com",
    phone_number: "0337510004",
    address: "Thủ Đức city",
  })

  User.create({
    // id: 5,
    username: "buyer05",
    password: "123456",
    fullname: "Nguyễn Văn E",
    email: "buy05@gmail.com",
    phone_number: "0337510005",
    address: "Hà Nội city",
  })

  User.create({
    // id: 6,
    username: "buyer06",
    password: "123456",
    fullname: "Nguyễn Sinh Nhựt",
    email: "buy06@gmail.com",
    phone_number: "0337510006",
    address: "Pleiku city",
  })

  User.create({
    // id: 7,
    username: "admin",
    password: "123456",
    fullname: "Nguyễn Sinh Nhựt",
    email: "buy06@gmail.com",
    phone_number: "0337510006",
    address: "Pleiku city",
  })


  // Thêm cart cho mỗi thằng: Mỗi cartId = userId
  Cart.create({
    // id: 1,
    userId: 1,
  })

  Cart.create({
    // id: 2,
    userId: 2,
  })

  Cart.create({
    // id: 3,
    userId: 3,
  })

  Cart.create({
    // id: 4,
    userId: 4,
  })

  Cart.create({
    // id: 5,
    userId: 5,
  })

  Cart.create({
    // id: 6,
    userId: 6,
  })


  // Thêm User_role
  //role
  // user: 1,2,3 -> seller
  // user: 123456 -> buyer
  // userId: 7 -> admin

  User_role.create({
    // id: 1,
    roleId: 2,
    userId: 1,
  })

  User_role.create({
    // id: 2,
    roleId: 2,
    userId: 2,
  })

  User_role.create({
    // id: 3,
    roleId: 2,
    userId: 3,
  })

  User_role.create({
    // id: 4,
    roleId: 1,
    userId: 4,
  })

  User_role.create({
    // id: 5,
    roleId: 1,
    userId: 5,
  })

  User_role.create({
    // id: 6,
    roleId: 1,
    userId: 6,
  })

  User_role.create({
    // id: 7,
    roleId: 1,
    userId: 1,
  })

  User_role.create({
    // id: 8,
    roleId: 1,
    userId: 2,
  })

  User_role.create({
    // id: 9,
    roleId: 1,
    userId: 3,
  })

  User_role.create({
    // id: 10,
    roleId: 3,
    userId: 7,
  })


  // Thêm Store (có 3 store ứng với 3 user 1, 2, 3)
  Store.create({
    // id: 1,
    description: "Đây là trang của seller01",
    phone_number: "0337519011",
    address: "Hồ Chí Minh city",
    avatar: "https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg",
    userId: 1,

  })

  Store.create({
    // id: 2,
    description: "Đây là trang của seller02",
    phone_number: "0337519022",
    address: "Thủ Đức city",
    avatar: "https://toigingiuvedep.vn/wp-content/uploads/2023/03/hinh-anh-avatar-dep-nam-ngau-cool.jpg",
    userId: 2,
  })

  Store.create({
    // id: 3,
    description: "Đây là trang của seller02",
    phone_number: "0337519033",
    address: "Thủ Đức city",
    avatar: "https://toigingiuvedep.vn/wp-content/uploads/2021/01/anh-avatar-dep-nam-chat-ngau.jpg",
    userId: 3,

  })

  /////////////////////////////////////////////
  // Thêm Product ()
  // https://www.lazada.vn/products/ao-khoac-bomber-teddy-nam-nu-dai-tay-phoi-vien-soc-form-rong-thoi-trang-yodi-ao-khoac-nam-046-i2035221893-s10656435485.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253A%2525C3%2525A1o%252Bkho%2525C3%2525A1c%253Bnid%253A2035221893%253Bsrc%253ALazadaMainSrp%253Brn%253A6b41c8d3a31b32da78bfe2018bd88e8a%253Bregion%253Avn%253Bsku%253A2035221893_VNAMZ%253Bprice%253A62000%253Bclient%253Adesktop%253Bsupplier_id%253A100219242%253Bpromotion_biz%253A%253Basc_category_id%253A7952%253Bitem_id%253A2035221893%253Bsku_id%253A10656435485%253Bshop_id%253A210904&fastshipping=0&freeshipping=0&fs_ab=2&fuse_fs=1&lang=en&location=H%C3%A0%20N%E1%BB%99i&price=6.2E%204&priceCompare=&ratingscore=4.339250493096647&request_id=6b41c8d3a31b32da78bfe2018bd88e8a&review=507&sale=2006&search=1&source=search&spm=a2o4n.searchlist.list.i40.2671f7d0wvNCf8&stock=1

  //--- Store1: product: 1,2,3
  //--- Store2: product: 4,5,6
  //--- Store3: product: 7,8,9

  Product.create({
    // id: 1,
    product_name: "Áo khoác nam ABC",
    description: "Sản phẩm áo khoác nam",
    storeId: "1",
    brand: "levi",
    discount_value: 20000,
    image: "https://lzd-img-global.slatic.net/g/p/eec16aefb0838a9659a4483b2fe2e3cb.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 1,
    storeId: 1,
  })

  Product.create({
    // id: 2,
    product_name: "Đồng hồ Rolex DD",
    description: "Đồng hồ vàng",
    storeId: "1",
    brand: "Thụy sĩ",
    discount_value: 30000,
    image: "https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 4,
    storeId: 1,
  })

  Product.create({
    // id: 3,
    product_name: "Túi xách VL Da cá sấu",
    description: "Túi xách trắng",
    storeId: "3",
    brand: "MIA",
    discount_value: 40000,
    image: "https://lzd-img-global.slatic.net/g/p/8cf9de5b55cc961e8556d857265185d1.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 9,
    storeId: 1,
  })

  Product.create({
    // id: 4,
    product_name: "Áo khoác nam XYZ",
    description: "Sản phẩm áo khoác nam",
    storeId: "2",
    brand: "levi",
    discount_value: 20000,
    image: "https://lzd-img-global.slatic.net/g/p/eec16aefb0838a9659a4483b2fe2e3cb.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 1,
    storeId: 2,
  })

  Product.create({
    // id: 5,
    product_name: "Đồng hồ 123456",
    description: "Đồng hồ vàng",
    storeId: "1",
    brand: "Thụy sĩ",
    discount_value: 30000,
    image: "https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 4,
    storeId: 2,
  })

  Product.create({
    // id: 6,
    product_name: "Túi xách abcdefgh",
    description: "Túi xách trắng",
    storeId: "2",
    brand: "MIA",
    discount_value: 40000,
    image: "https://lzd-img-global.slatic.net/g/p/8cf9de5b55cc961e8556d857265185d1.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 9,
    storeId: 2,
  })

  Product.create({
    // id: 7,
    product_name: "Áo khoác nam",
    description: "Sản phẩm áo khoác nam",
    storeId: "3",
    brand: "levi",
    discount_value: 20000,
    image: "https://lzd-img-global.slatic.net/g/p/eec16aefb0838a9659a4483b2fe2e3cb.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 1,
    storeId: 3,
  })

  Product.create({
    // id: 8,
    product_name: "Đồng hồ",
    description: "Đồng hồ vàng",
    storeId: "1",
    brand: "Thụy sĩ",
    discount_value: 30000,
    image: "https://lzd-img-global.slatic.net/g/p/bc9dc49231c13c51e0ebe413ee3f8fa2.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 4,
    storeId: 3,
  })

  Product.create({
    // id: 9,
    product_name: "Túi xách",
    description: "Túi xách trắng",
    storeId: "2",
    brand: "MIA",
    discount_value: 40000,
    image: "https://lzd-img-global.slatic.net/g/p/8cf9de5b55cc961e8556d857265185d1.jpg_720x720q80.jpg_.webp",
    inLivestream: false,
    categoryId: 9,
    storeId: 3,
  })

  //Thêm Cart_product
  Cart_product.create({
    // id: 1,
    cartId: 4,
    productId: 1,
  })

  Cart_product.create({
    // id: 2,
    cartId: 5,
    productId: 2,
  })

  Cart_product.create({
    // id: 3,
    cartId: 6,
    productId: 3,
  })

  Cart_product.create({
    // id: 4,
    cartId: 4,
    productId: 2,
  })

  Cart_product.create({
    // id: 5,
    cartId: 4,
    productId: 3,
  })

  /////////////////////////////////////////////
  // Thêm Product_detail

  Product_detail.create({
    // id: 1,
    quantity: 10,
    price: 100000,
    image: "https://lzd-img-global.slatic.net/g/p/743b58b648ad42460bccc88a65dafb94.jpg_720x720q80.jpg_.webp",
    productId: 1,
  })

  Product_detail.create({
    // id: 2,
    quantity: 20,
    price: 200000,
    image: "https://lzd-img-global.slatic.net/g/p/4b124b2a67fb4dc4a568be9436c0516c.jpg_720x720q80.jpg_.webp",
    productId: 1,
  })

  Product_detail.create({
    // id: 3,
    quantity: 30,
    price: 300000,
    image: "https://lzd-img-global.slatic.net/g/p/4b124b2a67fb4dc4a568be9436c0516c.jpg_720x720q80.jpg_.webp",
    productId: 1,
  })

  // Không nhập (ảnh sẽ giống ảnh product bên ngoài)
  Product_detail.create({
    // id: 4,
    quantity: 30,
    price: 300000,
    image: "https://lzd-img-global.slatic.net/g/p/4b124b2a67fb4dc4a568be9436c0516c.jpg_720x720q80.jpg_.webp",
    productId: 2,
  })

  //-> Nếu đúng phải nhập 9 cái product_detail

  // nhập bảng productDetail_VariationOption
  ProductDetail_VariationOption.create({
    // id: 1,
    productDetailId: 1,
    variationOptionId: 1,
  })


  ProductDetail_VariationOption.create({
    // id: 2,
    productDetailId: 1,
    variationOptionId: 3,
  })

  ProductDetail_VariationOption.create({
    // id: 3,
    productDetailId: 2,
    variationOptionId: 2,
  })

  ProductDetail_VariationOption.create({
    // id: 4,
    productDetailId: 2,
    variationOptionId: 3,
  })

  /////////////////////////////////////////////
  // thêm Follow
  // Store1: hasFollow userId: 4,5,6
  // Store2: hasFollow userId: 4
  // Store3: hasFollow userId: 5

  Follow.create({
    // id: 1,
    storeId: 1,
    userId: 4,
  })

  Follow.create({
    // id: 2,
    storeId: 1,
    userId: 5,
  })

  Follow.create({
    // id: 3,
    storeId: 1,
    userId: 6,
  })

  Follow.create({
    // id: 4,
    storeId: 2,
    userId: 4,
  })

  Follow.create({
    // id: 5,
    storeId: 3,
    userId: 5,
  })

  /////////////////////////////////////////////

//----------Tạo voucher--------------------//

Voucher.create({
  // id: 1,
  code: "VC001",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  description: "voucher 01",
  categoryId: 1,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 1,
  deleted: false,
})

Voucher.create({
  // id: 2,
  code: "VC002",
  description: "voucher 02",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 2,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 1,
  deleted: true,
})

Voucher.create({
  // id: 3,
  code: "VC003",
  description: "voucher 03",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 3,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 2,
})

Voucher.create({
  // id: 4,
  code: "VC004",
  description: "voucher 04",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 4,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 2,
})

Voucher.create({
  // id: 5,
  code: "VC005",
  description: "voucher 05",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 5,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 3,
})

Voucher.create({
  // id: 6,
  code: "VC006",
  description: "voucher 06",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 2,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 3,
})

Voucher.create({
  // id: 7,
  code: "VC007",
  description: "voucher 07",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 2,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 1,
})

Voucher.create({
  // id: 8,
  code: "VC008",
  description: "voucher 08",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 2,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 2,
})

Voucher.create({
  // id: 9,
  code: "VC009",
  description: "voucher 09",
  start_time: "2023-07-27T04:33:12.000Z",
  end_time: "2023-07-31T04:33:12.000Z",
  categoryId: 2,         //(categoryId),
  minSpend: 100000,
  quantity: 20,
  storeId: 3,
})

///--------------------------//
  // Thêm Order
  Order.create({
    // id: 1,
    order_date: "2023-07-27T04:33:12.000Z",
    order_status: "pending",
    payment_method: "cash",
    total_price: 500000,
    shipping_address: "Thủ Đức City",
    userId: 4,
  })

  Order.create({
    // id: 2,
    order_date: "2023-07-26T04:33:12.000Z",
    order_status: "completed",
    payment_method: "paypal",
    total_price: 600000,
    shipping_address: "HCM City",
    userId: 5,
  })

  Order.create({
    // id: 3,
    order_date: "2023-07-28T04:33:12.000Z",
    order_status: "pending",
    payment_method: "cash",
    total_price: 400000,
    shipping_address: "Thủ Đức City",
    userId: 4,
  })

  // Thêm order_detail (để lấy sản phẩm và số lượng sản phẩm trong 1 order)
  /*
  - Nhu cầu khi vào 1 order_detail sẽ phải lấy được sản phẩm, giá tiền, hoặc cụ thể size gì màu gì
  nếu mua quần áo, -> Order_detail phải là orderId kết hợp với product_detailId mới đúng
  */

  // orderId: 1 có 3 product_detail 1, 2, 3
  // orderId: 2 có 1 product_detail 4

  Order_detail.create({
    // id: 1,
    orderId: 1,
    product_detailId: 1,
    quantity: 2,
  })

  Order_detail.create({
    // id: 2,
    orderId: 1,
    product_detailId: 2,
    quantity: 1,
  })

  Order_detail.create({
    // id: 3,
    orderId: 1,
    product_detailId: 3,
    quantity: 1,
  })

  Order_detail.create({
    // id: 4,
    orderId: 2,
    product_detailId: 4,
    quantity: 2,
  })


  ///////////////////////////////////////////
  // Thêm Livestream

  Livestream.create({
    // id: 1,
    description: "Livestream 01",
    title: "livestream num1",
    storeId: 1,
    roomId: "",
    start_time: "2023-07-24T08:46:48.733Z",
    end_time: "2023-07-24T08:46:48.733Z",
    thumbnail: "https://bizweb.dktcdn.net/thumb/grande/100/202/714/products/dich-vu-livestream-phat-song-truc-tiep-su-kien-hoi-thao-3-may-quayunnamed.png?v=1550887093247",
  })

  Livestream.create({
    // id: 2,
    description: "Livestream 02",
    title: "livestream num2",
    storeId: 2,
    roomId: "",
    start_time: "2023-07-24T08:46:48.733Z",
    end_time: "2023-07-24T08:46:48.733Z",
    thumbnail: "https://bizweb.dktcdn.net/thumb/grande/100/202/714/products/dich-vu-livestream-phat-song-truc-tiep-su-kien-hoi-thao-3-may-quayunnamed.png?v=1550887093247",
  })

  Livestream.create({
    // id: 3,
    description: "Livestream 03",
    title: "livestream num3",
    storeId: 3,
    roomId: "",
    start_time: "2023-07-24T08:46:48.733Z",
    end_time: "2023-07-24T08:46:48.733Z",
    thumbnail: "https://bizweb.dktcdn.net/thumb/grande/100/202/714/products/dich-vu-livestream-phat-song-truc-tiep-su-kien-hoi-thao-3-may-quayunnamed.png?v=1550887093247",
  })

  ///---------------------------------//
  // Thêm Livestream_Product

  Livestream_product.create({
    // id: 1,
    orderInLive: 1,
    expectedSell: 10,
    productId: 1,
    livestreamId: 1,
  })

  Livestream_product.create({
    // id: 2,
    orderInLive: 2,
    expectedSell: 20,
    productId: 2,
    livestreamId: 1,
  })

  Livestream_product.create({
    // id: 3,
    orderInLive: 3,
    expectedSell: 15,
    productId: 3,
    livestreamId: 1,
  })

  //---------------------------------------//

  // thêm Feedback (từ buyer hoặc seller cho admin (1 admin quản lý))

  Feedback.create({
    // id: 1,
    title: "Report",
    content: "Shop 1 bán hàng sai thông tin",
    dateFeedback: "2023-07-27T04:33:12.000Z",
    userId: 4,
  })

  Feedback.create({
    // id: 2,
    title: "Report",
    content: "Shop 2 bán hàng sai thông tin",
    dateFeedback: "2023-07-27T04:33:12.000Z",
    userId: 5,
  })

  Feedback.create({
    // id: 3,
    title: "Report",
    content: "Shop 1 bán hàng sai thông tin",
    dateFeedback: "2023-07-27T04:33:12.000Z",
    userId: 6,
  })

  //---------------------//-----------------//

  // Thêm Product_review
  Product_review.create({
    // id: 1,
    review_title: "Sản phẩm tốt",
    review_content: "Sản phẩm đúng mô tả của shop",
    rating: 4,
    review_date: "2023-07-27T04:33:12.000Z",
    userId: 4,
    productId: 1,
  })

  Product_review.create({
    // id: 2,
    review_title: "Sản phẩm ok",
    review_content: "Sản phẩm dùng tốt",
    rating: 5,
    review_date: "2023-07-27T04:33:12.000Z",
    userId: 5,
    productId: 2,
  })

  Product_review.create({
    // id: 3,
    review_title: "Sản phẩm chất lượng",
    review_content: "Dùng bền chất lượng",
    rating: 4.5,
    review_date: "2023-07-27T04:33:12.000Z",
    userId: 6,
    productId: 2,
  })

  //--------------//------------------------//

  // Thêm Voucher - Percentage_discount

  Percentage_discount.create({
    // id: 1,
    percent: 10, // 10%
    voucherId: 1,
  })

  Percentage_discount.create({
    // id: 2,
    percent: 20, // 20%
    voucherId: 2,
  })

  Percentage_discount.create({
    // id: 3,
    percent: 30, // 30%
    voucherId: 3,
  })

  //-----------------------------
  // Thêm Voucher - Amount_discount

  Amount_discount.create({
    // id: 1,
    amount: 20000,
    voucherId: 4,
  })

  Amount_discount.create({
    // id: 2,
    amount: 30000,
    voucherId: 5,
  })

  Amount_discount.create({
    // id: 3,
    amount: 50000,
    voucherId: 6,
  })


  // Thêm Order_voucher
  // setTimeout(a => {

  //   Order_voucher.create({
  //     id: 2,
  //     orderId: 2,
  //     voucherId: 3,
  //   })

  // }, 2000);


  // Order_voucher.create({
  //   id: 2,
  //   voucherId: 2,
  //   orderId: 2,
  // })

  // Order_voucher.create({
  //   id: 3,
  //   voucherId: 3,
  //   orderId: 3,
  // })

  // Thêm 

}

module.exports = { initial };