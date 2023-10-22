const { getTransactionByBuyerId, addTransaction,getTransactionBySellerId } = require('../repositories/transactionRepository')
const { getUserById } = require('../repositories/userPrivateRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')

transactionService = {
    getTransaction: async (buyerId, sellerId) => {
        let errors = []
        let answer
        if (buyerId == undefined && sellerId == undefined)
            errors.push(new InputError("buyerId and sellerId", 'buyerId and sellerId are undefined'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors
        if(buyerId) {
            answer = await getTransactionByBuyerId(buyerId);
        } else if(sellerId){
             answer = await getTransactionBySellerId(sellerId);
        }

        if (answer == null)
            errors.push(new LogicError('Error when get the transactions of user'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
    postTransaction: async (buyerId, sellerId, productId, productPrice, sellerPaymentName) => {
        let errors = []

        if (buyerId == undefined)
            errors.push(new InputError("buyerId", 'buyerId is undefined'));
        if (sellerId == undefined)
            errors.push(new InputError("sellerId", 'sellerId is undefined'));
        if (productId == undefined)
            errors.push(new InputError("productId", 'productId is undefined'));
        if (productPrice == undefined)
            errors.push(new InputError("productPrice", 'productPrice is undefined'));
        if (sellerPaymentName == undefined)
            errors.push(new InputError("sellerPaymentName", 'sellerPaymentName is undefined'));

        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors

        let sellerInfo = await getUserById(sellerId)
        let {country,address, postalCode} =sellerInfo[0]
        if (sellerInfo == null)
            errors.push(new LogicError('Error when get seller info'));

        let answer = await addTransaction(buyerId, sellerId, country, address, postalCode, productId, productPrice, sellerPaymentName);

        if (answer == null)
            errors.push(new LogicError('Error when add the transaction'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
}
module.exports = transactionService