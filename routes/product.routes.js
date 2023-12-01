const { isTokenValid, isAdmin } = require('../middlewares/auth.middlewares');
const Product = require('../models/Product.model');

const router = require('express').Router();

//*GET "/api/products" => send all data from products list. Only name and image to be displayed
router.get("/", async (req, res, next) => {
    try{
        const allProducts = await Product.find().select({name: 1, image: 1})

        res.json(allProducts)

    }
    catch(error){
       next(error);
    }

})

//*POST "api/products/create" => create products 
router.post('/create', isTokenValid, isAdmin, async (req, res, next) =>{
 console.log(req.body);
 const { name, description, price, size, color, image, category } = req.body;
     try {
  
      // Create the product
       await Product.create({name, description, price, size, color, image, category, });
  
      res.status(201).json('Product created');
    } catch (error) {
      next(error);
    }

  });


//*GET "/api/products/:productId/details" => get a specific product with all the data by its Id
router.get("/:productId/details", async (req, res, next) =>{
    console.log(req.params)
    try{
        const singleProduct = await Product.findById(req.params.productId)
        res.json(singleProduct);
    }
    catch(error){
        next(error);
    }
})

//*DELETE "/api/products/:productId/delete" => delete a specific product
router.delete("/:productId/delete", isTokenValid, isAdmin, async (req, res, next) =>{
    try{
        await Product.findByIdAndDelete(req.params.productId)
        res.json("Product deleted")
    }
    catch(error){
        next(error);
    }
})

//*PUT "/api/products/:productId/update" => update a specific product
router.put("/:productId/update", async (req, res, next) => {
    const {productId} = req.params;
    const { name, description, price, size, color, category, image } = req.body;
    try{
        await Product.findByIdAndUpdate(productId, { name, description, price, size, color, category, image })
        res.json("Product updated") 
    }
    catch(error){
        next(error);
    }
})

//TODO ruta para añadir a wislist
module.exports = router; 