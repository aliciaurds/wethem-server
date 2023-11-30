// //*POST "api/admin/create" => create products 
// router.post('/admin/create', isTokenValid, isAdmin, async (req, res, next) =>{
//     try {
//       const { name, description, price, size, color, image_url } = req.body;
  
//       // Create the product
//       const newProduct = await Product.create({
//         name,
//         description,
//         price,
//         size,
//         color, 
//         image_url
      
//       });
  
//       res.status(201).json('Product created successfully', newProduct);
//     } catch (error) {
//       next(error);
//     }
//   });