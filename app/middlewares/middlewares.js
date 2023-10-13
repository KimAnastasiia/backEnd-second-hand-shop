let  authenticationMiddleware  = require("./authenticationMiddleware")

let initMiddlewares = (app) =>{
    app.use(["/products/", "/userPrivate/"],authenticationMiddleware)
}

module.exports = initMiddlewares;