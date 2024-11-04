const reviewRouter = require('express').Router();
const reviewController = require('../controllers/review');

reviewRouter.post('/add-review', reviewController.addReview);

// reviewRouter.get('/get-reviews', reviewController.getAllReviews);

module.exports = reviewRouter;
