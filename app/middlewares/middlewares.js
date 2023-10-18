let  authenticationMiddleware  = require("./authenticationMiddleware")

let initMiddlewares = (app) =>{
    app.use(["/products/", "/userPrivate/", "/userPayment/", "/transactions/"],authenticationMiddleware)
}

module.exports = initMiddlewares;