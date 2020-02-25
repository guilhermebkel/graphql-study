const database = require("../../lib/database")

module.exports = {
	async createUser(_, { data }) {
		const user = database("users").where({ email: data.email }).first()

		if (user) {
			throw new Error("User already exists!")
		}

		const profileIds = []

		if (data.profiles && data.profiles.length) {
			for (let key of Object.keys(data.profiles)) {
				if (key === "id") {
					profileIds.push(data.profiles[key])
				} else if (key === "name") {
					const { id } = await database("profiles").where({ name: data.profiles[key] }).first()
					profileIds.push(id)
				}
			}

			delete data.profiles
		}

		const [id] = await database("users").insert({ email: data.email, password: data.password, name: data.name}).returning("id")

		await Promise.all(profileIds.map(profile_id => database("users_profiles").insert({ profile_id, user_id: id })))

		const newUser = await database("users").where({ id }).first()

		return newUser
	},
	async deleteUser(_, { id }) {
		const user = await database("users").where({ id }).first()

		if (user) {
			await database("users_profiles").where({ user_id: id }).delete()
			await database("users").where({ id }).delete()

			return user
		} else {
			return null
		}
	},
	async changeUser(_, { id, data }) {
		const user = await database("users").where({ id }).first()

		if (user) {
			if (data.profiles && data.profiles.length) {
				await database("users_profiles").where({ user_id: id }).delete()

				for (let key of Object.keys(data.profiles)) {
					if (key === "id") {
						profileIds.push(data.profiles[key])
					} else if (key === "name") {
						const { id } = await database("profiles").where({ name: data.profiles[key] }).first()
						profileIds.push(id)
					}
				}
	
				delete data.profiles
			}

			await database("users").where({ id }).update(data)

			return { ...user, ...data }
		} else {
			return null
		}
	}
}