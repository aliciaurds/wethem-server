//require models
const User = require("../models/User.model");
//require packages
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//require middleware
const {isTokenValid, isUserNotLoggedIn} = require("../middlewares/auth.middlewares")

//*POST "/api/auth/signup" => get data from the user and creates it inside the DB
router.post("/signup", isUserNotLoggedIn, async (req, res, next) => {
  console.log(req.body);
  
  const {
    firstName,
    lastName,
    username,
    email,
    street,
    city,
    country,
    postalCode,
    dateOfBirth,
    password,
    profilePic,
  } = req.body;

  //BE validations
  //1.Check that the fields are not empty
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !street ||
    !city ||
    !country ||
    !postalCode ||
    !dateOfBirth ||
    !profilePic
  ) {
    res.status(400).json({
      errMessage: "All fields must be filled up",
    });
    return; //stops execution
  }
  //2. Check the password to be in correct format
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errMessage:
        "password must have at least 8 characters, one upper and one lower case letter and a number",
    });
    return;
  }
  //3. Check if the email format is correct
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res.status(400).json({
      errMessage: "email doesn't have a valid format",
    });
  }
  try {
    //4. Check that email does not get duplicate
    const foundUser = await User.findOne({ email: email });
    //-->if exists
    if (foundUser) {
      res.status(400).json({
        errMessage: "Email already registered",
      });
      return; //stops execution
    }
    //5. Check that username does not get duplicate
    const foundName = await User.findOne({ username: username });
    if (foundName) {
      res.status(400).json({
        errMessage: "User already registered",
      });
      return; //deten ejecucion de la ruta
    }
    //encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash(password, salt);
    console.log(hashPass);

    //after every validation and get password encrypted we create the user
    await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPass,
      street,
      city,
      country,
      postalCode,
      dateOfBirth,
      profilePic,
    });
    res.status(201).json("user successfully created");
  } catch (err) {
    next(err);
  }
});
//*POST "/api/auth/login" => get credentials from user and validate
router.post("/login", isUserNotLoggedIn, async (req, res, next) => {
  console.log(req.body);
  //again validate that the fiels are not empty
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      errMessage: "All fields must be filled up",
    });
    return; //stops execution
  }
  try{
    //validate user is registered
    const foundUser = await User.findOne({ email: email})
    if(!foundUser) {
        res.status(400).json({errMessage: "User not registered"})
        return;
    }
    //validate password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      res.status(400).json({errMessage: "Wrong password!"});
      return;
    }
    //auth with tokens. //1. Create payload  //2. Add Info (info that shouldn't change)
    const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role
    }
    //create token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '2d'})
    //send to FE
    res.json({authToken: authToken})


  }
  catch (err) {
    next(err);
  }
});

//*GET "api/auth/verify" =>  info if the view is active and who is it=> send to FE
//here to validate the token, get the payload and send it to FE.
//this indicates if user is logged in or not. If logged in => who is it.
//we need a middleware 
router.get('/verify', isTokenValid, (req, res,next) => {
console.log(req.payload);
res.json({payload: req.payload})
})
//*PUT "/api/auth/change-password" => update password
router.put("/change-password", isTokenValid, async (req, res, next) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    res.status(400).json("must be filled",);
    return;
  }

  try {
    const user = await User.findById(req.payload._id);

    if (!user) {
      res.status(404).json("User not found");
      return;
    }

    // Encripta la nueva contraseña
    const salt = await bcrypt.genSalt(12);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    // Actualiza la contraseña del usuario en la base de datos
    user.password = hashNewPassword;
    await user.save();

    res.status(200).json("Password updated successfully");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
