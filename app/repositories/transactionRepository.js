const database = require("./database")

transactionRepository = {
    getTransactionByBuyerId: async (buyerId) => {
        let info = null;

        try{
            await database.connect();
            info = await database.query(`
            SELECT * 
            FROM transaction
            JOIN products
            ON transaction.productId=products.id 
            WHERE transaction.buyerId = ?`,[buyerId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return info
    },
    getTransactionBySellerId: async (sellerId) => {
        let info = null;

        try{
            await database.connect();
            info = await database.query(`
            SELECT * 
            FROM transaction
            JOIN products
            ON transaction.productId = products.id  
            WHERE transaction.sellerId = ?`,[sellerId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return info
    },
    addTransaction: async (buyerId, sellerId, sellerCountry, sellerAddress, sellerPostCode, productId, productPrice, buyerPaymentName) => {
        let insertInfo = null;
        try{
            await database.connect();
            insertInfo = await database.query("INSERT INTO transaction (buyerId, sellerId, sellerCountry, sellerAddress, sellerPostCode, productId, productPrice, buyerPaymentName) VALUES (?,?,?,?,?,?,?,?)",
                [buyerId, sellerId, sellerCountry, sellerAddress, sellerPostCode, productId, productPrice, buyerPaymentName])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return insertInfo
	}
}
module.exports = transactionRepository