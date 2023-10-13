const database = require("./database")

userPrivateRepository = {

    getUser: async (email, id) => {
        let users = null;
        try{
            await database.connect();
            users = await database.query("SELECT email, name, surname, birthday,country,adress, postalCode, id FROM users WHERE email = ? and id = ? ",[email, id])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return users
	},
}
module.exports =userPrivateRepository