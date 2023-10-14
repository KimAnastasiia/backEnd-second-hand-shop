const express = require("express")
const {getAlias, postCart} = require('../controllers/creditCartsController')

const creditCartsRouter = express.Router();

creditCartsRouter.get("/", getAlias);
creditCartsRouter.post("/", postCart);

module.exports = creditCartsRouter