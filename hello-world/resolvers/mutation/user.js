let { users, nextId } = require("../../database/mock")

module.exports = {
	newUser(_, { data: { name, email, age } }) {
		const emailExists = users.some(user => user.email === email)

		if (emailExists) {
			throw new Error("Email already exists")
		}

		const newUser = {
			 id: nextId(),
			 name,
			 email,
			 age,
			 profile_id: 1,
			 status: "ACTIVE"
		 }

		 users.push(newUser)

		 return newUser
	},
	deleteUser(_, { id }) {
		const deletedUser = users.find(user => user.id == id)

		users.filter(user => user.id !== id)

		return deletedUser
	}
}