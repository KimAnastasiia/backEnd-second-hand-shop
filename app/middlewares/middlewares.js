let  authenticationMiddleware  = require("./authenticationMiddleware")

let initMiddlewares = (app) =>{
    app.use(["/products/", "/userPrivate/", "/userPayment/", "/transactions/", "/favorites/"],authenticationMiddleware)
}

module.exports = initMiddlewares;