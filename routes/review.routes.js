const Review = require("../models/Review.model");
const Product = require("../models/Product.model");
const router = require("express").Router();
const { isTokenValid} = require("../middlewares/auth.middlewares");

//* POST "/api/review/:productId/add" => Add a review to a specific product
router.post("/:productId/add", isTokenValid, async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    const userId = req.payload._id;
    const { productId } = req.params;
    console.log(userId);
    console.log(req.params);

    // Check if the product exists

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newReview = await Review.create({
      comment,
      rating,
      user: userId,
      product: productId,
    });
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

//* GET "/api/review/:productId/reviews" => Get all reviews for a specific product
router.get("/:productId/reviews", async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Find all reviews for the specific product
    const reviews = await Review.find({ product: productId });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

//* DELETE "/api/review/:reviewId/delete" => Delete a specific review from a product, if you are the owner of the review or you are an administrator
router.delete('/:reviewId/delete', isTokenValid, async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const userId = req.payload._id;
      const userRole = req.payload.role;
      const review = await Review.findById(reviewId);
    
      console.log(review); 
      console.log(userId);
      console.log(review.user.toString());
    
      // Check if the review exists
      if (!review) {
        return res.status(404).json('Review not found');
      }
    
      // Check if the user is the owner of the review or an admin
      if (review.user.toString() === userId || userRole === 'admin') {
        // Delete the review
        await Review.findByIdAndDelete(reviewId);
        return res.status(200).json( 'Review deleted successfully');
      }
    
      return res.status(403).json( 'Unauthorized' );
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
