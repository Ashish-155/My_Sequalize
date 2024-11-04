const { where } = require("sequelize");
const db = require("../models/index.js");
const Products = db.products
const Review = db.reviews


const addReview = async (req, res) => {
    try {
        const { ratings, description, product_id } = req.body;

        const checkProduct = await Products.findOne({
            where: {
                id: product_id,
            }
        });
        if (!checkProduct) {
            return res.send({ message: "Product not found." })
        }

        const newReview = await Review.create({
            ratings,
            description,
            product_id,
        });
        res.send({ message: "Review added successfully", data: newReview });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addReview,
}