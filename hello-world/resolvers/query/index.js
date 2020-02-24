const ProfileQuery = require("./profile")
const UserQuery = require("./user")

module.exports = {
	...ProfileQuery,
	...UserQuery
}