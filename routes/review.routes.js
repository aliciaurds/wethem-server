const { isTokenValid } = require('../middlewares/auth.middlewares');
const Review = require('../models/Review.model');
const Product = require('../models/Product.model');
const router = require('express').Router();

// POST "/api/products/:productId/reviews/add" => Add a review to a specific product
router.post('/:productId/reviews/add', isTokenValid, async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    const { productId } = req.params;
    const user = req.user; // Assuming user information is available in req.user after authentication

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create the review
    const review = await Review.create({
      comment,
      rating,
      user: user._id, // Assuming user information is stored in req.user after authentication
      product: productId,
    });

    // Add the review to the product's reviews array
    product.reviews.push(review);
    await product.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    next(error);
  }
});

// GET "/api/products/:productId/reviews" => Get all reviews for a specific product
router.get('/:productId/reviews', async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Find the product and populate its reviews
    const productWithReviews = await Product.findById(productId).populate('reviews');

    if (!productWithReviews) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(productWithReviews.reviews);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/products/:productId/reviews/:reviewId/delete" => Delete a specific review from a product
router.delete('/:productId/reviews/:reviewId/delete', isTokenValid, async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;
    const user = req.user; // Assuming user information is available in req.user after authentication

    // Find the review and check if the user has permission to delete
    const review = await Review.findOneAndDelete({ _id: reviewId, user: user._id });

    if (!review) {
      return res.status(404).json({ error: 'Review not found or user does not have permission to delete' });
    }

    // Remove the review ID from the product's reviews array
    await Product.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;