const userRepository = require('../repositories/userRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')
const UnauthorizedError = require('../errors/unauthorizedError')
const activeApiKeys = require("../activeApiKeys")
const jwt = require("jsonwebtoken");

productsService = {
    loginUser: async (email, password) => {
        let errors = []

        if (email == undefined)
            errors.push(new InputError("email", 'email is undefined'));
        if (password == undefined)
            errors.push(new InputError("password", 'password is undefined'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors


        let users = await userRepository.getUsersByEmailAndPassword(email, password);
        if (users == null)
            errors.push(new LogicError('Error when access to users'));
        else if (users.length == 0)
            errors.push(new UnauthorizedError('Email and password dont match'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        // Generate JWT Token
        let apiKey = jwt.sign(
            {
                email: users[0].email,
                id: users[0].id
            },
            "secret");
        activeApiKeys.push(apiKey)

        return {
            apiKey: apiKey,
            email: email,
            id: users[0].id
        }
    },
    createUser: async (email, password, name, surname, birthday, documentNumber, country, address, postalCode, documentIdentity) => {
        let errors = []

        if (email == undefined)
            errors.push(new InputError("email", 'no email'));
        if (password == undefined)
            errors.push(new InputError("password", 'no password'));
        if (name == undefined)
            errors.push(new InputError("name", 'no name'));
        if ( documentNumber== undefined)
            errors.push(new InputError("documentNumber", 'no identity document'));
        if (country == undefined)
            errors.push(new InputError("country", 'no country'));
        if (documentIdentity == undefined)
            errors.push(new InputError("documentIdentity", 'no documentIdentity'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors

        let usersWithsameEmail = await userRepository.getUsersByEmail(email);
        if (usersWithsameEmail == null) {
            errors.push(new LogicError('Error when check previous users'));
        } else if (usersWithsameEmail.length > 0) {
            errors.push(new InputError("email", 'email already in use'));
        }

        let user = {}
        // try to insert the user
        if (usersWithsameEmail.length == 0) {
            user = await userRepository.createUser(email, password, name, surname, birthday, documentNumber, country, address, postalCode, documentIdentity);
            if (user == null)
                errors.push(new LogicError('Error when create the user '));
        }

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        let users = await userRepository.getUsersByEmailAndPassword(email, password);
        if (users == null)
            errors.push(new LogicError('Error when access to users'));
        else if (users.length == 0)
            errors.push(new UnauthorizedError('Email and password dont match'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        // Generate JWT Token
        let apiKey = jwt.sign(
            {
                email: users[0].email,
                id: users[0].id
            },
            "secret");
        activeApiKeys.push(apiKey)

        return {
            apiKey: apiKey,
            email: email,
            id: users[0].id
        }
    },
    createUserPhoto: async (file, userId) => {

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
    disconnect: async (apikey) => {
        let errors = []

        if (apiKey == undefined) {
            errors.push(new LogicError('Not apiKey'));
        }
        let infoInApiKey = jwt.verify(apiKey, "secret");
        if (infoInApiKey == undefined || activeApiKeys.indexOf(apiKey) == -1) {
            errors.push(new LogicError('is not a valid apikey'));
        }

        if (errors.length > 0)
            throw errors

        const index = activeApiKeys.indexOf(apikey);
        activeApiKeys.splice(index, 1)

        return true;
    },
    isActiveApiKey: async (apikey) => {
        let errors = []

        if (apikey == undefined) {
            errors.push(new LogicError('Not apiKey'));
        }

        if (errors.length > 0)
            throw errors

        if (activeApiKeys.indexOf(apikey) != -1) {
            return true;
        }

        return false;
    }
}

module.exports = productsService