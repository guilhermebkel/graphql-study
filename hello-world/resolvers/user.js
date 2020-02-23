const { profiles } = require("../database/mock")

module.exports = {
	income(user) {
		return user.totalIncome
	},
	profile(user) {
		const selectedProfile = profiles.find(profile => profile.id == user.profile_id)
		return selectedProfile
	}
}
