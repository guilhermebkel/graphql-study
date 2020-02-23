const { ApolloServer } = require("apollo-server")
const { importSchema } = require("graphql-import")

const resolvers = require("./resolvers")

async function start() {
	const schema = await importSchema("./schemas/index.graphql")

	const server = new ApolloServer({
		typeDefs: schema,
		resolvers
	})

	server.listen().then(({ url }) => {
		console.log(`- Apollo Server running... [${url}]`)
	})
}

start()