const {Product_review, User} = require('../models');

const createProductReview = async (req, res) => {
    
    const {review_title, review_content, rating, productId, userId} = req.body;
    try {
        const user = await User.findOne({
            where: {
                username: req.username
            }
        })
        const newProductReview = await Product_review.create({
            review_title,
            review_content,
            rating,
            productId,
            userId: user.id
        })
        return res.status(201).json({message: "Create product review successfully", value: newProductReview})
    } catch (error) {
        res.status(400).json({message: "Create product review fail"})
    }

}

const getProductReviewByProductId = async (req, res) => {
    const {productId} = req.params;
    try {
        const productReviews = await Product_review.findAll({
            where: {
                productId
            },
            include: User
        })
        return res.status(200).json(productReviews);
    } catch (error) {
        console.log(error);
    }
}
const getNumOfReview = async (req, res) => {
    const {productId} = req.params;
    try {
        const productReviews = await Product_review.findAll({
            where: {
                productId
            },
            include: User
        })
        const numsOfReview = productReviews?.map((item) => item.rating);
        // console.log(numsOfReview);
        let result = 0;
        for(let num of numsOfReview) {
            result += num;
        }
        // if(result === 0) {
        //     res.status(200).json({rating: 4.5});
        // }
        const rating = result / numsOfReview?.length;
        return res.status(200).json({rating: rating ? rating : 4.5 });
    } catch (error) {
        console.log(error);
    }

}


module.exports = {createProductReview, getProductReviewByProductId, getNumOfReview};