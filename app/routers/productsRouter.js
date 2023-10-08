const express = require("express")
const productsController = require('../controllers/productsController')

const productsRouter = express.Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProduct);
productsRouter.post("/", productsController.postProduct);
productsRouter.post("/photos", productsController.postPhotosOfProduct);
productsRouter.put("/:id", productsController.putProduct);

module.exports = productsRouter