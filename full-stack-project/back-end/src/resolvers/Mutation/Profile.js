const database = require("../../lib/database")

module.exports = {
	async createProfile(_, { data }) {
		const [ id ] = await database("profiles").insert(data)

		const profile = await database("profiles").where({ id }).first()

		return profile
	},
	deleteProfile(_, { id }) {
		// TODO
	},
	changeProfile(_, { data }) {
		// TODO
	}
}