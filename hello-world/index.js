const { ApolloServer, gql } = require("apollo-server")

const typeDefs = gql`
	scalar Date

	type User {
		id: ID
		name: String!
		email: String!
		age: Int
		income: Float
		premium: Boolean
	}

	# API Entry Points
	type Query {
		helloWorld: String
		currentTime: Date
		loggedUser: User
	}
`

const resolvers = {
	User: {
		income(user) {
			return user.totalIncome
		}
	},

	Query: {
		helloWorld() {
			return "You're welcome!"
		},
		currentTime() {
			return new Date
		},
		loggedUser() {
			return {
				id: 1,
				name: "Guilherme Mota",
				email: "guilhermebromonschenkel@gmail.com",
				age: 20,
				totalIncome: 100,
				premium: true
			}
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.log(`- Apollo Server running... [${url}]`)
})