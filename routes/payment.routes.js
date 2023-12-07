const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const Order = require("../models/Order.model")

router.post("/create-payment-intent", async (req, res, next) => {

  const totalProducts = req.body 
  let totalPrice = 0;
  totalProducts.forEach((eachProduct) => {
    totalPrice = (totalPrice + eachProduct.price);
  })

  try {
    // TODO . this is where you will later get the correct price to be paid

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice*100, 
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    await Order.create({
        totalPrice: totalPrice,
        products: totalProducts,
        status: "incomplete",
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        user: req.payload 
      })

    // TODO on part 2. this is where you will later create a Payment Document later
  
    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
    
  } catch (error) {
    next(error)
  }
});
router.patch("/update-payment-intent", async (req, res, next) => {
    const { clientSecret, paymentIntentId } = req.body;
  
    try {
  
      await Order.findOneAndUpdate({
        clientSecret: clientSecret,
        paymentIntentId: paymentIntentId,
      },{ 
        status: "succeeded" 
      });
  
      res.status(200).json();
  
    } catch (error) {
      next(error);
    }
  });

module.exports = router