const { ApolloServer } = require("apollo-server")
const { importSchema } = require("graphql-import")
const resolvers = require("../resolvers")
const context = require("../utils/context")

module.exports.start = async function() {
	const typeDefs = await importSchema("src/schemas/index.graphql")

	const server = new ApolloServer({ typeDefs, resolvers, context })

	server.listen().then(({ url }) => {
		console.log(`Running at ${url}`)
	})
}
