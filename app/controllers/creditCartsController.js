const {getAlias, postCart} = require('../services/creditCartsService')

creditCartsController = {

	getAlias: async (req, res) => {
       
        try {
            let userId = req.infoInApiKey.id 
            const alias =getAlias(userId)
            return res.json(alias)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    },
    postCart: async (req, res) => {
       
        try {
            let { number, expirationCart, code, alias} = req.body
            let userId = req.infoInApiKey.id 
            const cart =postCart( userId,number, expirationCart, code, alias)
            return res.json(cart)
        }catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    }
}
module.exports = creditCartsController