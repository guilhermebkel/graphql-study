const database = require("../../lib/database")

module.exports = {
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