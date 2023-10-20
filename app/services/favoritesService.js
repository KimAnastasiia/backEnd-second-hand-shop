const { getMyFavorites, addInFavorites, deleteFromFavorites } = require('../repositories/favoritesRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')

favoritesService = {

    getMyFavorites: async (userId) => {
        let errors = []

        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));

        if (errors.length > 0)
            throw errors

        let answer = await getMyFavorites(userId);

        if (answer == null)
            errors.push(new LogicError('Error when get favorites'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
    postInFavorites: async (userId, productId) => {
        let errors = []

        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));
        if (productId == undefined)
            errors.push(new InputError("productId", 'productId is undefined'));
        if (errors.length > 0)
            throw errors

        let answer = await addInFavorites(userId, productId);

        if (answer == null)
            errors.push(new LogicError('Error when insert favorites'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    },
    deleteFromFavorites: async (userId, productId) => {
        let errors = []

        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));
        if (productId == undefined)
            errors.push(new InputError("productId", 'productId is undefined'));
        if (errors.length > 0)
            throw errors

        let answer = await deleteFromFavorites(userId, productId);

        if (answer == null)
            errors.push(new LogicError('Error when delete favorite'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return answer
    }
}
module.exports = favoritesService