const server = require("./lib/server")

module.exports.boot = async function() {
	await server.start()
}