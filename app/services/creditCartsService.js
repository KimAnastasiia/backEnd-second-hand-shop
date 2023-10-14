const { getAlias, addCart } = require('../repositories/creditCartsRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')

creditCartsService = {

    getAlias: async (userId) => {
        let errors = []

        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));

        if (errors.length > 0)
            throw errors

        let answer = await getAlias(userId);

        if (answer == null)
            errors.push(new LogicError('Error when get alias'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
    postCart: async (userId, number, expirationCart, code, alias) => {
        let errors = []

        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));
        if (number == undefined)
            errors.push(new InputError("number", 'number is undefined'));
        if (expirationCart == undefined)
            errors.push(new InputError("expirationCart", 'expirationCart is undefined'));
        if (code == undefined)
            errors.push(new InputError("code", 'code is undefined'));
        if (alias == undefined)
            errors.push(new InputError("alias", 'alias is undefined'));

        if (errors.length > 0)
            throw errors

        let answer = await addCart(userId, number, expirationCart, code, alias);

        if (answer == null)
            errors.push(new LogicError('Error when insert cart'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
}
module.exports = creditCartsService