const bcrypt = require("bcrypt-nodejs")
const { getLoggedInUser } = require("../Common/User")

const database = require("../../lib/database")

module.exports = {
	async login(_, { data }) {
		const user = await database("users").where({ email: data.email }).first()

		if (!user) {
			throw new Error("User not found!")
		}

		const isPasswordValid = bcrypt.compareSync(data.password, user.password)

		if (!isPasswordValid) {
			throw new Error("Invalid data supplied")
		}

		const loggedInUser = await getLoggedInUser(user)

		return loggedInUser
	},
	async users() {
		const users = await database("users")

		return users
	},
	async user(_, { filter }) {
		if (!filter) {
			return null
		}

		const { id, email } = filter

		if (id) {
			return await database("users").where({ id }).first()
		} else if (email) {
			return await database("users").where({ email }).first()
		} else {
			return null
		}
	}
}