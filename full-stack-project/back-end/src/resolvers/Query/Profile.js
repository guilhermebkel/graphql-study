const database = require("../../lib/database")

module.exports = {
	async profiles() {
		const profiles = await database("profiles")

		return profiles
	},
	profile(_, { id }) {
		const selectedProfile = profiles.find(profile => profile.id == id)
		return selectedProfile
	}
}