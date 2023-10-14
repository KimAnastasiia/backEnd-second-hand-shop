const {getAlias} = require('../services/creditCartsService')

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
        
    }
}
module.exports = creditCartsController