const productService = require('../services/productsService')

productsController = {
	putProduct: async (req, res) => {
		try {
			let { title, description, price } = req.body
			productId = req.params.id
			userId = req.infoInApiKey.id

			const modified = await productService.putProduct(userId, productId, title, description, price)
			return res.json({"modified": modified})
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	putProductBuyerId: async (req, res) => {
		try {
			let { buyerId, id} = req.body
			await productService.putBuyerIdOfProduct(buyerId, id)
			return res.json({"buyed": true})
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	postProduct: async (req, res) => {
		try {
			let { title, description, price } = req.body
			let userId = req.infoInApiKey.id // i put this info in the middleware

			const productId = await productService.postProduct(userId, title, description, price )
			return res.json({"productId": productId})
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	postPhotosOfProduct: async (req, res) => {
		try {
			let {productId} = req.body
			let file = req.files.photos
			const answer = await productService.postProductPhotos( file, productId)
			return res.json(answer)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	getProduct: async (req, res) => {
		try {
			let id = req.params.id
			const product = await productService.getProduct(id)
			return res.json(product)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	getProducts: async (req, res) => {
		try {
			const products = await productService.getProducts()
			return res.json(products)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	getAllProductsOfUser: async (req, res) => {
		try {
			let id = req.params.id
			const products = await productService.getAllProductsOfUser(id)
			return res.json(products)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	}
}

module.exports = productsController
