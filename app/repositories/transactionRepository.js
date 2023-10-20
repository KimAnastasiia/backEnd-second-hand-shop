const database = require("./database")

transactionRepository = {
    getTransactionInfo: async (buyerId) => {
        let info = null;

        try{
            await database.connect();
            info = await database.query("SELECT * FROM transaction where buyerId = ? or sellerId = ?",[buyerId, buyerId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return info
    },
    addTransaction: async (buyerId, sellerId, sellerCountry, selerAddress, sellerPostCode, productId, productPrice, sellerPaymentName) => {
        let insertInfo = null;
        try{
            await database.connect();
            insertInfo = await database.query("INSERT INTO transaction (buyerId, sellerId, sellerCountry, sellerAddress, sellerPostCode, productId, productPrice, sellerPaymentName) VALUES (?,?,?,?,?,?,?,?)",
                [buyerId, sellerId, sellerCountry, selerAddress, sellerPostCode, productId, productPrice, sellerPaymentName])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return insertInfo
	}
}
module.exports = transactionRepository