const database = require("./database")

creditCartsRepository = {

    getAlias: async (userId) => {
        let alias = null;
        try{
            await database.connect();
            alias = await database.query("SELECT alias FROM creditcarts WHERE userId = ?",[userId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return alias
	},
    addCart: async (userId, number, expirationCart, code, alias) => {
        let cart = null;
        try{
            await database.connect();
            cart = await database.query("INSERT INTO creditcarts (userId, number, expirationDate, code, alias) VALUES (?,?,?,?,?)",[userId, number, expirationCart, code, alias])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return cart
	},
}
module.exports =creditCartsRepository