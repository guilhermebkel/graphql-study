const jwt = require("jwt-simple")

module.exports = ({ req }) => {
	const authHeader = req.headers.authorization

	let user = null
	let admin = false

	const [, authToken] = (authHeader && authHeader.split(" ")) || ["", ""]

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

	const authError = new Error("Unauthorized!")

	return {
		user,
		admin,
		validateUser() {
			if (!user) {
				throw authError
			}
		},
		validateAdmin() {
			if (!admin) {
				throw authError
			}
		},
		validateUserFilter(filter) {
			if (admin) {
				return
			}

			if (!user) {
				throw authError
			}

			const { id, email } = filter

			if (id && id !== user.id) {
				throw authError
			}

			if (email && email !== user.email) {
				throw authError
			}
		}
	}
}