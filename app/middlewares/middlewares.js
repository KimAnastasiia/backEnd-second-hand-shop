let  authenticationMiddleware  = require("./authenticationMiddleware")

let initMiddlewares = (app) =>{
    app.use(["/products/", "/userPrivate/", "/userPayment/"],authenticationMiddleware)
}

module.exports = initMiddlewares;