const express = require("express")
const {getMyFavorites, postInFavorites, deleteFromFavorites} = require('../controllers/favoritesController')

const favoritesRouter = express.Router();

favoritesRouter.get("/",getMyFavorites );
favoritesRouter.post("/:productId", postInFavorites);
favoritesRouter.delete("/:productId",deleteFromFavorites );

module.exports = favoritesRouter