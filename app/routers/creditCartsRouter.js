const express = require("express")
const {getAlias, postCart, deleteCart} = require('../controllers/creditCartsController')

const creditCartsRouter = express.Router();

creditCartsRouter.get("/", getAlias);
creditCartsRouter.post("/", postCart);
creditCartsRouter.delete("/", deleteCart);
module.exports = creditCartsRouter