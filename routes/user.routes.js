const router = require('express').Router();
const User = require('../models/User.model');
const { isTokenValid } = require('../middlewares/auth.middlewares');
const Review = require('../models/Review.model');

//* GET "/api/profile" => get info from user profile
router.get('/', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id; //get user id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(400).json('User not found');
    }

    res.json(user); //gives back user info
  } catch (err) {
    next(err);
  }
});
//*PUT "/api/profile/edit " => update info from user profile

router.put('/edit', isTokenValid, async (req, res, next) => {
    const userId = req.payload._id; 
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        street,
        city,
        country,
        postalCode,
        dateOfBirth,
        profilePic,
    } = req.body;
    
    try {
      // Find the user by ID and update the fields
      await User.findByIdAndUpdate( userId,
        {
          firstName,
          lastName,
          username,
          email,
          password,
          street,
          city,
          country,
          postalCode,
          dateOfBirth,
          profilePic,
        }
      );
      res.json("Profile Updated")
  
    } catch (err) {
      next(err);
    }
  });

//* GET "api/profile/wishlist" => user's wishlist
router.get('/wishlist', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id;  
    const user = await User.findById(userId).populate('wishlist', 'name image');
    //remember that populated is used when I have a relationship in my model, to replace the paths , it's like a reference . https://mongoosejs.com/docs/populate.html
    //in the example wishlist it's refered to the property in User, and name image is what we want to populate into wislist.

    res.json(user.wishlist);
  } catch (err) {
    next(err);
  }
});

//* POST "api/profile/wishlist/:productId/add" add product to user's wishlist
router.post('/wishlist/:productId/add', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.productId;

    // Find user by ID and add productId to wishlist array, $addToSet adds value to an array unless the value is already present, in which case does nothing: https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/
    await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } });

    res.json('Product added to wishlist');
  } catch (err) {
    next(err);
  }
});

//* DELETE "api/profile/wishlist/:productId/delete => remove product from user's wishlist
router.delete('/wishlist/:productId/delete', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.productId;

    // Find user by ID and remove productId from wishlist array, $pull operator removes from an existing array all instances of a value that match a specified condition https://www.mongodb.com/docs/manual/reference/operator/update/pull/
    // finds the user document using userId and takes out the productId from wishlist 
    await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } });

    res.json('Removed from wishlist');
  } catch (err) {
    next(err);
  }
});
//* GET "api/profile/shoppingCart" => user's shoppingCart
router.get('/shoppingCart', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id;  
    const user = await User.findById(userId).populate('shoppingCart', 'name image price');

    res.json(user.shoppingCart);
  } catch (err) {
    next(err);
  }
});
//* POST "api/profile/shoppingCart/:productId/add" add product to user's shoppingCart
router.post('/shoppingCart/:productId/add', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.productId;

    await User.findByIdAndUpdate(userId, { $addToSet: { shoppingCart: productId } });

    res.json('Added to shoppingCart');
  } catch (err) {
    next(err);
  }
});
//* DELETE "api/profile/shoppingCart/:productId/delete => remove product from user's shoppingCart
router.delete('/shoppingCart/:productId/delete', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.productId;

    await User.findByIdAndUpdate(userId, { $pull: { shoppingCart: productId } });

    res.json('Removed from shoppingCart');
  } catch (err) {
    next(err);
  }
});
//* DELETE "api/profile/delete-account
router.delete("/delete-account", isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id;

    // Encuentra y elimina al usuario
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(400).json("User not found");
    }

    // Cambiar el autor de los comentarios asociados al usuario eliminado
    //$set para actualizar los valores de un documento
    await Review.updateMany({ user: userId }, { $set: { user: null, username: 'Deleted User' } });

    res.json("User account deleted successfully. Comments updated");
  } catch (err) {
    next(err);
  }
});
module.exports = router;