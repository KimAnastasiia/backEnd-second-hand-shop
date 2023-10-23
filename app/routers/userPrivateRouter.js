const express = require("express")
const {getUserInformation, putUserInfo, getUserById, putUserPhoto} = require('../controllers/userPrivateController')

const userPrivateRouter = express.Router();

userPrivateRouter.get("/", getUserById);
userPrivateRouter.get("/:email", getUserInformation);
userPrivateRouter.put("/photo", putUserPhoto);
userPrivateRouter.put("/", putUserInfo);

module.exports = userPrivateRouter