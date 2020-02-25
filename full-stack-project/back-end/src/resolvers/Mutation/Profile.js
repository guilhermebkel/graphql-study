const database = require("../../lib/database")

module.exports = {
	async createProfile(_, { data }) {
		const [id] = await database("profiles").insert(data).returning("id")

		const profile = await database("profiles").where({ id }).first()

		return profile
	},
	async deleteProfile(_, { id }) {
		const profile = await database("profiles").where({ id }).first()

		if (profile) {
			await database("users_profiles").where({ profile_id: id }).delete()
			await database("profiles").where({ id }).delete()

			return profile
		} else {
			return null
		}
	},
	async changeProfile(_, { id, data }) {
		const profile = await database("profiles").where({ id }).first()

		if (profile) {
			await database("profiles").where({ id }).update(data)

			return { ...profile, ...data }
		} else {
			return null
		}
	}
}