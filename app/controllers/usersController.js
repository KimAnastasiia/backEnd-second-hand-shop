const usersService = require('../services/usersService')

usersController = {
	loginUser: async (req, res) => {
		try {
			let { email, password } = req.body
			const tokenAndEmail = await usersService.loginUser(email, password)
			return res.json(tokenAndEmail)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	postUser: async (req, res) => {
		try {
			let { email, password } = req.body
			const userId = await usersService.createUser(email, password)
			return res.json({"userId": userId})
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	disconnect: async (req, res) => {
		try {
			let apikey = req.headers.apikey 
			const disconnected = await usersService.disconnect(apikey)
			return res.json({"disconnected": disconnected})
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	isActiveApiKey: async (req, res) => {
		try {
			let apikey = req.headers.apikey 
			const activeApiKey = await usersService.isActiveApiKey(apikey)
			return res.json({"activeApiKey": activeApiKey})
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	}
}

module.exports = usersController