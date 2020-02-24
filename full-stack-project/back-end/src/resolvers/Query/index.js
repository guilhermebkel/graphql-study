const ProfileQuery = require("./Profile")
const UserQuery = require("./User")

module.exports = {
	...ProfileQuery,
	...UserQuery
}