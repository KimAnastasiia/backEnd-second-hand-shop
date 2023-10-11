const database = require("./database")

productsRepository = {
    editProduct: async (productId, title, description, price) => {
        let modifiedInfo = null;
        try{
            await database.connect();
            modifiedInfo = await database.query("UPDATE products SET title=?, description=?, price=? WHERE id=?",
                [title, description, price, productId])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return modifiedInfo
	},
    addProduct: async (sellerId, date, title, description, price) => {
        let insertInfo = null;
        try{
            await database.connect();
            insertInfo = await database.query("INSERT INTO products (sellerId, date, title, description, price) VALUES (?,?,?,?,?)",
                [sellerId, date, title, description, price])
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return insertInfo
	},
    getProducts: async () => {
        let products = null;

        try{
            await database.connect();
            products = await database.query("SELECT * FROM products")
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return products
	},
	getProduct: async (id) => {
        let product = null;

        try{
            await database.connect();
            let products = await database.query("SELECT * FROM products WHERE id = ?",[id])
            if ( products.length > 0){
                product = products[0]
            }
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        } 

        return product
	},
    getAllProductsOfUser: async (sellerId) => {
        let products = null;

        try{
            await database.connect();
            products = await database.query("SELECT * FROM products where sellerId="+sellerId)
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return products
	},
}

module.exports = productsRepository