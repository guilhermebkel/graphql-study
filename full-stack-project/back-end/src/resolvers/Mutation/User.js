const bcrypt = require("bcrypt-nodejs")

const database = require("../../lib/database")

const { profiles: getUserProfiles } = require("../Type/User")

const Mutations = {
	async createUser(_, { data }, context) {
		context && context.validateAdmin()

		const user = await database("users").where({ email: data.email }).first()

		if (user) {
			throw new Error("User already exists!")
		}

		const profileIds = []

		if (!data.profiles || !data.profiles.length) {
			data.profiles = [{ name: "common" }]
		}

		for (let profile of data.profiles) {
			if (profile.id) {
				profileIds.push(profile.id)
			} else if (profile.name) {
				const { id } = await database("profiles").where({ name: profile.name }).first()
				profileIds.push(id)
			}
		}

		delete data.profiles

		const salt = bcrypt.genSaltSync()

		data.password = bcrypt.hashSync(data.password, salt)

		const [id] = await database("users").insert({ email: data.email, password: data.password, name: data.name}).returning("id")

		await Promise.all(profileIds.map(profile_id => database("users_profiles").insert({ profile_id, user_id: id })))

		const newUser = await database("users").where({ id }).first()

		return {
			...newUser,
			profiles: await getUserProfiles(newUser)
		}
	},
	async deleteUser(_, { id }, context) {
		context && context.validateAdmin()

		const user = await database("users").where({ id }).first()

		if (user) {
			await database("users_profiles").where({ user_id: id }).delete()
			await database("users").where({ id }).delete()

			return user
		} else {
			return null
		}
	},
	async changeUser(_, { id, data }, context) {
		context && context.validateUserFilter({ id })

		const user = await database("users").where({ id }).first()

		if (user) {
			if (context && context.admin && data.profiles && data.profiles.length) {
				await database("users_profiles").where({ user_id: id }).delete()

				for (let profile of data.profiles) {
					if (profile.id) {
						profileIds.push(profile.id)
					} else if (profile.name) {
						const { id } = await database("profiles").where({ name: profile.name }).first()
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
	},
	async registerUser(_, { data }) {
		return await Mutations.createUser(_, {
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
				profiles: null
			}
		})
	}
}

module.exports = Mutations