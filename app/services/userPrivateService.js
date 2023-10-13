const userPrivateRepository = require('../repositories/userPrivateRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')
const UnauthorizedError = require('../errors/unauthorizedError')
const activeApiKeys = require("../activeApiKeys")
const jwt = require("jsonwebtoken");

userPrivateService = {
    getUserInfo:async (email, id) => {
        let errors = []

        if (email == undefined)
            errors.push(new InputError("email", 'email is undefined'));
        if (id == undefined)
            errors.push(new InputError("id", 'id is undefined'));
        if (errors.length > 0)
            throw errors

        let user = await userPrivateRepository.getUser(email, id)

        if (user == null)     
            errors.push(new LogicError('Error when get user info'))    

        return user;
    },
}
module.exports = userPrivateService