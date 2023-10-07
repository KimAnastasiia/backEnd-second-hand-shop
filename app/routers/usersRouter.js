const express = require("express")
const usersController = require('../controllers/usersController')

const usersRouter = express.Router();

usersRouter.post("/login",usersController.loginUser);
usersRouter.post("/",usersController.postUser);
usersRouter.post("/disconnect", usersController.disconnect);
usersRouter.get("/isActiveApiKey", usersController.isActiveApiKey);

module.exports = usersRouter