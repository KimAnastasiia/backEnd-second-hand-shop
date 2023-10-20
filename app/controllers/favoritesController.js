const {getMyFavorites, postInFavorites, deleteFromFavorites} = require('../services/favoritesService')

favoritesController = {

	getMyFavorites: async (req, res) => {
       
        try {
            let userId = req.infoInApiKey.id
            let favorites =await getMyFavorites(userId)
            return res.json(favorites)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    },
    postInFavorites: async (req, res) => {
       
        try {
            let productId = req.params.productId
            let userId = req.infoInApiKey.id 
            const inserted = await postInFavorites( userId,productId)
            return res.json(inserted)
        }catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    },
    deleteFromFavorites: async (req, res) => {
       
        try {
            let productId = req.params.productId
            let userId = req.infoInApiKey.id 
            const answer = await deleteFromFavorites(userId, productId)
            return res.json(answer)
        }catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    }
}
module.exports = favoritesController