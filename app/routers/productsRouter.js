const express = require("express")
const productsController = require('../controllers/productsController')

const productsRouter = express.Router();

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProduct);
productsRouter.get("/allOfUser/:id", productsController.getAllProductsOfUser);
productsRouter.post("/", productsController.postProduct);
productsRouter.post("/photos", productsController.postPhotosOfProduct);
productsRouter.put("/:id", productsController.putProduct);

module.exports = productsRouter