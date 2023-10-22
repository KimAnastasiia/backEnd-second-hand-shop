const database = require("./database")

favoritesRepository = {

    getMyFavorites: async (userId) => {
        let favorites = null;
        try{
            await database.connect();
            favorites = await database.query(`SELECT * FROM favorites JOIN products ON favorites.productId=products.id
            WHERE userId = ?`,[userId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return favorites
	},
    addInFavorites: async (userId, productId) => {
        let inserted = null;
        try{
            await database.connect();
            inserted = await database.query("INSERT INTO favorites (userId, productId) VALUES (?,?)",[userId,productId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return inserted
	},
    deleteFromFavorites: async (userId, productId) => {

        let info = null;
        try{
            await database.connect();
            info = await database.query("DELETE FROM favorites WHERE userId=? and productId=?", [userId, productId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return info
	},
}
module.exports = favoritesRepository