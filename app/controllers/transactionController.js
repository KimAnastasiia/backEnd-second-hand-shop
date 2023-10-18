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
            let { buyerId, sellerId, sellerCountry, selerAddress, sellerPostCode, productId, productPrice, sellerPaymentName} = req.body
            const insertInfo = await postTransaction( buyerId, sellerId, sellerCountry, selerAddress, sellerPostCode, productId, productPrice, sellerPaymentName)
            return res.json(insertInfo)
        }catch (errors) {
            return res.status(errors[0].code).json({ errors: errors} )
        }
        
    },
}
module.exports = transactionController