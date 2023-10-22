const {getTransaction, postTransaction} = require('../services/transactionService')

transactionController = {
	getTransaction: async (req, res) => {
       
        try {
            let buyerId = req.query.buyerId
            let sellerId = req.query.sellerId
            let transactions =await getTransaction(buyerId,sellerId)
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