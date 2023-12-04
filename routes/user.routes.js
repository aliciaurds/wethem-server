const router = require('express').Router();
const User = require('../models/User.model');
const { isTokenValid } = require('../middlewares/auth.middlewares');

//* GET "/api/profile" => get info from user profile
router.get('/', isTokenValid, async (req, res, next) => {
  try {
    const userId = req.payload._id; //get user id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json('User not found');
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

module.exports = router;