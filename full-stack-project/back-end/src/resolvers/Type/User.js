const database = require("../../lib/database")

module.exports = {
	async profiles(user) {
		const profiles = await database("profiles")
			.join("users_profiles", "profiles.id", "users_profiles.profile_id")
			.where({ user_id: user.id })

			return profiles
	}
}
