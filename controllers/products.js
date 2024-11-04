const { where } = require("sequelize");
const db = require("../models/index.js");
const Products = db.products
const Review = db.reviews

const createProduct = async (req, res) => {
    try {
        const { title, name, price, description, published } = req.body;
        const product = await Products.create({
            title, price, description, published,
            name,
        });
        return res.send({ message: "Product created successfully", data: product });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Products.findAll({
            attributes: [
                'title',
                'price'
            ]
        });
        res.status(200).send(allProducts);
    } catch (error) {
        console.log(error);
    }
}

// get single produc
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({
            where: {
                id: id,
            }
        });
        res.status(200).send({ message: "Product fetched successfully", data: product });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.update({
            where: {
                id: id,
            },
            data: {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                published: req.body.published,
            }
        });
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// delete product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Products.destroy({
            where: {
                id: id,
            }
        });
        res.status(200).send({ message: "Product deleted successfully." });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// get published product

const getPublishedProducts = async (req, res) => {
    try {
        const publishedProducts = await Products.findAll({
            where: {
                published: true,
            },
            attributes: [
                'title',
                'price'
            ]
        });
        res.status(200).send(publishedProducts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// with relations
const getProductWithReview = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: [{
                model: Review,
                as: 'reviews',
            }]
        });
        res.status(200).send({ success: true, message: "Products with reviews fetched successfully.", data: products });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getPublishedProducts,
    getProductWithReview,


}






