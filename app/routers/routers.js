let  productsRouter  = require("./productsRouter")
let  usersRouter  = require("./usersRouter")
let  userPrivateRouter  = require("./userPrivateRouter")
let initRouters = (app) =>{
    app.use("/products/",productsRouter)
    app.use("/users/",usersRouter)
    app.use("/userPrivate/",userPrivateRouter)
}

module.exports = initRouters;