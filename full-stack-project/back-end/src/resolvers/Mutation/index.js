const UserMutation = require("./User")
const ProfileMutation = require("./Profile")

module.exports = { ...UserMutation, ...ProfileMutation }