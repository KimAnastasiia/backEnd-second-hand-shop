let  authenticationMiddleware  = require("./authenticationMiddleware")

let initMiddlewares = (app) =>{
    app.use(["/products/"],authenticationMiddleware)
}

module.exports = initMiddlewares;