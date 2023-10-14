const {getAlias} = require('../repositories/creditCartsRepository')
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
}
module.exports =creditCartsService