const database = require("../../lib/database")

module.exports = {
	async profiles(_, {}, context) {
		context && context.validateAdmin()

		const profiles = await database("profiles")

		return profiles
	},
	async profile(_, { filter }, context) {
		context && context.validateUserFilter(filter)

		if (!filter) {
			return null
		}

		const { id, name } = filter

		if (id) {
			return await database("profiles").where({ id }).first()
		} else if (name) {
			return await database("profiles").where({ name }).first()
		} else {
			return null
		}
	}
}