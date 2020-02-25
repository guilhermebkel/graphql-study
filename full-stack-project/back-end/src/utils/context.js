const jwt = require("jwt-simple")

module.exports = ({ req }) => {
	const authHeader = req.headers.authorization

	let user = null
	let admin = false

	if (!authHeader) {
		return { user, admin }
	}

	const [, authToken] = authHeader.split(" ")

	const authSecret = process.env.AUTH_SECRET

	try {
		const decoded = jwt.decode(authToken, authSecret)

		if (new Date(decoded.exp * 1000) > new Date()) {
			user = decoded
		}
	} catch(error) {
		// Invalid token
	}

	if (user && user.profiles && user.profiles.length) {
		admin = user.profiles.includes("admin")
	}

	return {
		user,
		admin,
		validateUser() {
			if (!user) {
				throw new Error("Unauthenticated!")
			}
		},
		validateUser() {
			if (!admin) {
				throw new Error("Unauthenticated!")
			}
		}
	}
}