let  productsRouter  = require("./productsRouter")
let  usersRouter  = require("./usersRouter")
let  userPrivateRouter  = require("./userPrivateRouter")
const creditCartsRouter = require("./creditCartsRouter")

let initRouters = (app) =>{
    app.use("/products/",productsRouter)
    app.use("/users/",usersRouter)
    app.use("/userPrivate/",userPrivateRouter)
    app.use("/userPayment/",creditCartsRouter)
}

module.exports = initRouters;