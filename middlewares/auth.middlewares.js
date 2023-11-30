const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  console.log(req.headers); // auth info

  //use of try catch as method to check the code, manage errors
  try {
    //remove token from string
    const token = req.headers.authorization.split(" ")[1]; //return array with token (index 1)
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    //verify token and get decrypted payload

    req.payload = payload;

    next();
  } catch (err) {
    //if token does not exists, it's not valid or there isn't headers:
    res.status(401).json("Token does not exist, or is not valid");
  }


}

module.exports = isTokenValid;
