const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter)

const productRouter = require("./product.routes")
router.use("/products", productRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

const reviewRoutes = require("./review.routes");
router.use("/review", reviewRoutes);
module.exports = router;
