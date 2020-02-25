const jwt = require("jwt-simple")

const { profiles: getUserProfiles } = require("../Type/User")

module.exports = {
	async getLoggedInUser(user) {
		const profiles = await getUserProfiles(user)

		const now = Math.floor(Date.now() / 1000)

		const userInfo = {
			id: user.id,
			name: user.name,
			email: user.email,
			profiles: profiles.map(profile => profile.name),
			iat: now,
			exp: now + (3 * 24 * 3600)
		}

		const authSecret = process.env.AUTH_SECRET

		return {
			...userInfo,
			token: jwt.encode(userInfo, authSecret)
		}
	}
}