const userPrivateService = require('../services/userPrivateService')

userPrivateController = {
    getUserInformation: async (req, res) => {
		try {
			let { email} = req.params
			let userId = req.infoInApiKey.id
			const user = await userPrivateService.getUserInfo(email, userId)
			return res.json(user)
		}
		catch (errors) {
			return res.status(errors[0].code).json({ errors: errors} )
		}
	},
}
module.exports =userPrivateController