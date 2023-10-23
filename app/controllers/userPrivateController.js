const {putProduct,getUserInfo, getUserById, putUserPhoto } = require('../services/userPrivateService')

userPrivateController = {
    getUserInformation: async (req, res) => {
		try {
			let { email} = req.params
			let userId = req.infoInApiKey.id
			const user = await getUserInfo(email, userId)
			return res.json(user)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	getUserById: async (req, res) => {
		try {
			let sellerId = req.query.id
			const user = await getUserById(sellerId)
			return res.json(user)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
	putUserInfo: async (req, res) => {
		let { password, name, surname, documentIdentity, birthday, documentNumber, country, address, postalCode} = req.body
		let userId = req.infoInApiKey.id
		const answer = await putProduct( password, name, surname, documentIdentity, birthday, documentNumber, country, address, postalCode, userId)
		return res.json(answer)
	},
	putUserPhoto: async (req, res) => {
		try {
			let id= req.infoInApiKey.id
			let file = req.files.photo
			const answer = await putUserPhoto(file,id)
			return res.json(answer)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
}
module.exports =userPrivateController