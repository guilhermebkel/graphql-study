const database = require("../../lib/database")

module.exports = {
	async createProfile(_, { data }, context) {
		context && context.validateAdmin()

		const [id] = await database("profiles").insert(data).returning("id")

		const profile = await database("profiles").where({ id }).first()

		return profile
	},
	async deleteProfile(_, { id }, context) {
		context && context.validateAdmin()

		const profile = await database("profiles").where({ id }).first()

		if (profile) {
			await database("users_profiles").where({ profile_id: id }).delete()
			await database("profiles").where({ id }).delete()

			return profile
		} else {
			return null
		}
	},
	async changeProfile(_, { id, data }, context) {
		context && context.validateAdmin()
		
		const profile = await database("profiles").where({ id }).first()

		if (profile) {
			await database("profiles").where({ id }).update(data)

			return { ...profile, ...data }
		} else {
			return null
		}
	}
}