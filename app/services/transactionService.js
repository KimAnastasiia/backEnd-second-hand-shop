const { getTransactionInfo, addTransaction } = require('../repositories/transactionRepository')
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

        let answer = await getTransactionInfo(buyerId, sellerId);

        if (answer == null)
            errors.push(new LogicError('Error when get the transactions of user ' + buyerId));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
    postTransaction: async (buyerId, sellerId, sellerCountry, selerAddress, sellerPostCode, productId, productPrice, sellerPaymentName) => {
        let errors = []

        if (buyerId == undefined)
            errors.push(new InputError("buyerId", 'buyerId is undefined'));
        if (sellerId == undefined)
            errors.push(new InputError("sellerId", 'sellerId is undefined'));
        if (sellerCountry == undefined)
            errors.push(new InputError("sellerCountry", 'sellerCountry is undefined'));
        if (selerAddress == undefined)
            errors.push(new InputError("selerAddress", 'selerAddress is undefined'));
        if (sellerPostCode == undefined)
            errors.push(new InputError("sellerPostCode", 'sellerPostCode is undefined'));
        if (productId == undefined)
            errors.push(new InputError("productId", 'productId is undefined'));
        if (productPrice == undefined)
            errors.push(new InputError("productPrice", 'productPrice is undefined'));
        if (sellerPaymentName == undefined)
            errors.push(new InputError("sellerPaymentName", 'sellerPaymentName is undefined'));

        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors

        let answer = await addTransaction(buyerId, sellerId, sellerCountry, selerAddress, sellerPostCode, productId, productPrice, sellerPaymentName);

        if (answer == null)
            errors.push(new LogicError('Error when add the transaction'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
}
module.exports = transactionService