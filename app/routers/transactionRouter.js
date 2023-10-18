const express = require("express")
const {getTransaction, postTransaction} = require('../controllers/transactionController')

const transactionRouter = express.Router();

transactionRouter.get("/", getTransaction);
transactionRouter.post("/", postTransaction);

module.exports = transactionRouter