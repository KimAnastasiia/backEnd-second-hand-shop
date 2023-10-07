const database = require("./database")

productsRepository = {
    getUsersByEmail: async (email) => {
        let users = null;
        try{
            await database.connect();
            users = await database.query("SELECT * FROM users WHERE email = ?",[email])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return users
	},
    getUsersByEmailAndPassword: async (email,password) => {
        let users = null;
        try{
            await database.connect();
            users = await database.query("SELECT * FROM users WHERE email = ? AND password = ?",[email,password])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return users
	},
    createUser: async (email,password) => {
        let insertInfo = null;

        try{
            await database.connect();
            insertInfo = await database.query("INSERT INTO users (email,password) VALUES (?,?)",[email,password])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return insertInfo
	}
}

module.exports = productsRepository