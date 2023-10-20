const {getTransaction, postTransaction} = require('../services/transactionService')

transactionController = {
	getTransaction: async (req, res) => {
       
        try {
            let userId = req.infoInApiKey.id 
            let transactions =await getTransaction(userId)
            return res.json(transactions)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    },
    postTransaction: async (req, res) => {
       
        try {
            let userId = req.infoInApiKey.id 
            let { sellerId, id, price,sellerPaymentName } = req.body
            const insertInfo = await postTransaction( userId, sellerId, id, price,sellerPaymentName )
            return res.json(insertInfo)
        }catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    },
}
module.exports = transactionController