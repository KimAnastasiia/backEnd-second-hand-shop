const express = require("express")
const {getAlias} = require('../controllers/creditCartsController')

const creditCartsRouter = express.Router();

creditCartsRouter.get("/", getAlias);


module.exports = creditCartsRouter