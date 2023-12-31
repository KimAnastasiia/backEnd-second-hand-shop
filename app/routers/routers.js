let  productsRouter  = require("./productsRouter")
let  usersRouter  = require("./usersRouter")
let  userPrivateRouter  = require("./userPrivateRouter")
const creditCartsRouter = require("./creditCartsRouter")
const transactionRouter = require("./transactionRouter")
const favoritesRouter = require("./favoritesRouter")

let initRouters = (app) =>{
    app.use("/products/",productsRouter)
    app.use("/users/",usersRouter)
    app.use("/userPrivate/",userPrivateRouter)
    app.use("/userPayment/",creditCartsRouter)
    app.use("/transactions/",transactionRouter)
    app.use("/favorites/", favoritesRouter)
}

module.exports = initRouters;