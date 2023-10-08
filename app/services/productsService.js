const productRepository = require('../repositories/productRepository')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')

productsService = {
    postProduct: async (sellerId, title, description, price) => {
        let errors = []

        if (title == undefined)
            errors.push(new InputError("title", 'title is undefined'));
        if (title != null && title.length != null && title.length < 5)
            errors.push(new InputError("title", 'title is too short'));
        if (price == undefined || isNaN(price))
            errors.push(new InputError("price", 'price is not a number'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors

        let date = Date.now();
        let product = await productRepository.addProduct(sellerId, date, title, description, price);
        if (product == null)
            errors.push(new LogicError('Error when adding the product'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return product.insertId
    },
    postProductPhotos: async (files, productId, userId) => {
        let errors = []
        if (files.length < 1)
            errors.push(new InputError("files", 'files is undefined'));
        if (productId == undefined)
            errors.push(new InputError("productId", 'productId is undefined'));
        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors
        let answer = { finish: true }
        files.forEach(async (file, index) => {

            //answer = await productRepository.addProductPhoto(file,index, productId, userId);
            let promiseAwnser = await new Promise( (resolve) => {

                file.mv('images/' + userId+productId+file+index+'.png', async (err) => {
    
                    if(err){
                        console.log(err)
                        resolve(true)
                    }
                    resolve(true)
                
                })
            })

            if (promiseAwnser == null)
                errors.push(new LogicError('Error in uploading images for product ' + productId));

            // Errors in the logic of service
            if (errors.length > 0)
                throw errors
            //return
        })


        return answer
    },
    putProduct: async (userId, productId, title, description, price) => {
        let errors = []

        if (productId == undefined)
            errors.push(new InputError("productId", 'Not valid product Id'));
        if (title == undefined)
            errors.push(new InputError("title", 'title is undefined'));
        if (title != null && title.length != null && title.length < 5)
            errors.push(new InputError("title", 'title is too short'));
        if (price == undefined || isNaN(price))
            errors.push(new InputError("price", 'price is not a number'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors


        let product = await productRepository.getProduct(productId);
        if (product == null)
            errors.push(new LogicError('Product does not exists'));
        if (product.sellerId != userId)
            errors.push(new LogicError('You are not the owner of the product'));
        if (product.buyerId != null)
            errors.push(new LogicError('Product already has been purchased'));
        if (errors.length > 0)
            throw errors


        let modified = await productRepository.editProduct(productId, title, description, price);

        if (modified == null)
            errors.push(new LogicError('Error when updating the product'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return true
    },
    getProduct: async (id) => {
        let errors = []

        if (id == undefined)
            errors.push(new InputError("id", 'id is undefined'));
        if (isNaN(id))
            errors.push(new InputError("id", 'id is undefined'));
        // Errors in client INPUTS
        if (errors.length > 0)
            throw errors

        let product = await productRepository.getProduct(id);
        if (product == null)
            errors.push(new LogicError('Error when get the product ' + id));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return product
    },
    getProducts: async () => {
        let errors = []

        let products = await productRepository.getProducts();

        if (products == null)
            errors.push(new LogicError('Error when get the products'));

        // Errors in the logic of service
        if (errors.length > 0)
            throw errors

        return products
    }
}

module.exports = productsService