const router = require('express').Router();

const productController = require('../controllers/products');

router.post("/add-products", productController.createProduct);

router.get("/get-products", productController.getAllProducts);
router.get("/published-products", productController.getPublishedProducts);
router.get("/get-single-product/:id", productController.getSingleProduct);

router.put("/update-product/:id", productController.updateProduct);

router.delete("/delete-product/:id", productController.deleteProduct);

router.get("/products-withreviews", productController.getProductWithReview);



module.exports = router;
