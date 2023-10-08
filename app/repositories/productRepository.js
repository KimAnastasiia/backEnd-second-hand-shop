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
    addProductPhoto: (file, index,  productId, userId) => {
        return new Promise( (resolve) => {


            file.mv('images/' + userId+productId+file+index+'.png', async (err) => {

                if(err){
                    console.log(err)
                    resolve(true)
                }
                resolve(true)
            
            })

            //setTimeout(() => resolve(true), 3000)
        })
       
	},
    getProductByName: async (name) => {
        let product = null;

        try{
            await database.connect();
            let arrayProducts = await database.query("SELECT * FROM products")
            if ( arrayProducts > 0){
                product = arrayProducts[0]
            }
            await database.disconnect();
        } catch (e){
            await database.disconnect();
            console.log(e) // ERROR IN DATABASE OR SQL
        }

        return product
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
	}
}

module.exports = productsRepository