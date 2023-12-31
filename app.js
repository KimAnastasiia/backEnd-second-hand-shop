const express = require("express")

const initMiddlewares = require("./app/middlewares/middlewares")
const initRouters  = require("./app/routers/routers")

const port = 4000;
const app = express();
const cors = require('cors')
app.use(express.static('public'));
app.use(cors())
var fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.json())

initMiddlewares(app)
initRouters(app);

app.listen(port, () => {
    console.log("FinalApp listening on port "+port)
})