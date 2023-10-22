const usersService = require('../services/usersService')
const jwt = require("jsonwebtoken");
const activeApiKeys = require("../activeApiKeys")
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
			let { email, password, name, surname, birthday, documentNumber, country, address, postalCode, documentIdentity } = req.body
			const apiKey = await usersService.createUser(email, password,  name, surname, birthday, documentNumber, country, address, postalCode,documentIdentity)
			return res.json({apiKey})
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	postUserPhoto: async (req, res) => {
		try {
			let {apiKey} = req.body
			let infoInApiKey = jwt.verify(apiKey, "secret");
			if ( infoInApiKey == undefined || activeApiKeys.indexOf(apiKey) == -1){
				res.status(401).json({ errors: { msg:"no apiKey"} });
				return 	
			}
			let file = req.files.photo
			const answer = await usersService.createUserPhoto(file, infoInApiKey.id)
			return res.json(answer)
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