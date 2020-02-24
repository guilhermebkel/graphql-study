const { users } = require("../../database/mock")

module.exports = {
	users() {
		return users
	},
	user(_, { id }) {
		const selectedUser = users.find(user => user.id == id)
		return selectedUser
	}
}