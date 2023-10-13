const express = require("express")
const userPrivateController = require('../controllers/userPrivateController')

const userPrivateRouter = express.Router();

userPrivateRouter.get("/:email", userPrivateController.getUserInformation);

module.exports = userPrivateRouter