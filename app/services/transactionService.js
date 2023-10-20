const { getTransactionInfo, addTransaction } = require('../repositories/transactionRepository')
const { getUserForTransaction } = require('../repositories/userPrivateRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')

transactionService = {
    getTransaction: async (buyerId) => {
        let errors = []

        if (buyerId == undefined)
            errors.push(new InputError("buyerId", 'buyerId is undefined'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors

        let answer = await getTransactionInfo(buyerId);

        if (answer == null)
            errors.push(new LogicError('Error when get the transactions of user ' + buyerId));

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

        let sellerInfo = await getUserForTransaction(sellerId)
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