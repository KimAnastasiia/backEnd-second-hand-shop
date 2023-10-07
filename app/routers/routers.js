let  productsRouter  = require("./productsRouter")
let  usersRouter  = require("./usersRouter")

let initRouters = (app) =>{
    app.use("/products/",productsRouter)
    app.use("/users/",usersRouter)
}

module.exports = initRouters;