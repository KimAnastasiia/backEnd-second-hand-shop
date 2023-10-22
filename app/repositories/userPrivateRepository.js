const database = require("./database")

userPrivateRepository = {

    getUser: async (email, id) => {
        let users = null;
        try{
            await database.connect();
            users = await database.query("SELECT * FROM users WHERE email = ? and id = ? ",[email, id])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return users
	},
    getUserById: async (sellerId) => {
        let users = null;
        try{
            await database.connect();
            users = await database.query("SELECT country, address, postalCode, name, email, surname, birthday  FROM users WHERE id = ? ",[sellerId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return users
	},
    editUserInfo: async (password, name, surname, documentIdentity, birthday, documentNumber, country, address, postalCode, userId ) => {
        let modifiedInfo = null;
        try{
            await database.connect();
            modifiedInfo = await database.query("UPDATE users SET password=?, name=?, surname=?, documentIdentity=?, birthday=?, documentNumber=?, country=?, address=?, postalCode=? WHERE id=?",
                [password, name, surname, documentIdentity, birthday, documentNumber, country, address, postalCode, userId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return modifiedInfo
	},
}
module.exports =userPrivateRepository