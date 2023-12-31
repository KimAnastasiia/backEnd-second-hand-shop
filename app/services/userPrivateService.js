const { editUserInfo, getUser, getUserById } = require('../repositories/userPrivateRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')
const UnauthorizedError = require('../errors/unauthorizedError')
const activeApiKeys = require("../activeApiKeys")
const jwt = require("jsonwebtoken");

userPrivateService = {
    getUserInfo: async (email, id) => {
        let errors = []

        if (email == undefined)
            errors.push(new InputError("email", 'email is undefined'));
        if (id == undefined)
            errors.push(new InputError("id", 'id is undefined'));
        if (errors.length > 0)
            throw errors

        let user = await getUser(email, id)

        if (user == null)
            errors.push(new LogicError('Error when get user info'))

        return user;
    },
    getUserById: async (sellerId) => {
        let errors = []

        if (sellerId == undefined)
            errors.push(new InputError("sellerId", 'sellerId is undefined'));

        if (errors.length > 0)
            throw errors

        let user = await getUserById(sellerId)

        if (user == null)
            errors.push(new LogicError('Error when get seller info'))

        return user;
    },
    putProduct: async (password, name, surname, documentIdentity, birthday, documentNumber, country, address, postalCode, userId) => {
        let errors = []

    
        if (password == undefined)
            errors.push(new InputError("password", 'no password'));
        if (surname == undefined)
            errors.push(new InputError("surname", 'no surname'));
        if (name == undefined)
            errors.push(new InputError("name", 'no name'));
        if (documentNumber == undefined)
            errors.push(new InputError("documentNumber", 'no identity document'));
        if (birthday == undefined)
            errors.push(new InputError("birthday", 'no birthday'));
        if (country == undefined)
            errors.push(new InputError("country", 'no country'));
        if (userId == undefined)
            errors.push(new InputError("userId", 'no userId'));
        if (documentIdentity == undefined)
            errors.push(new InputError("documentIdentity", 'no documentIdentity'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors

        let modified = await editUserInfo(password, name, surname, documentIdentity, birthday, documentNumber, country, address, postalCode, userId);

        if (modified == null)
            errors.push(new LogicError('Error when updating user info'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return true
    },
    putUserPhoto: async (file, userId) => {

        let errors = []
        if (file==null)
            errors.push(new InputError("file", 'file is undefined'));
        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors
        let answer = { finish: true }
        return new Promise( (resolve) => {

            file.mv('public/images/' +userId+'user.png', async (err) => {

                if(err){
                    
                    return {error:"error"}
                }

            
            })


            resolve (answer)
        })
    },
}
module.exports = userPrivateService