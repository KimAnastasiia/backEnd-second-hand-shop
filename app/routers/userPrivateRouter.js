const express = require("express")
const {getUserInformation, putUserInfo} = require('../controllers/userPrivateController')

const userPrivateRouter = express.Router();

userPrivateRouter.get("/:email", getUserInformation);
userPrivateRouter.put("/", putUserInfo);

module.exports = userPrivateRouter