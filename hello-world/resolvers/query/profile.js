const { profiles } = require("../../database/mock")

module.exports = {
	profiles() {
		return profiles
	},
	profile(_, { id }) {
		const selectedProfile = profiles.find(profile => profile.id == id)
		return selectedProfile
	}
}