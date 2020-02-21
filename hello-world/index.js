const { ApolloServer, gql } = require("apollo-server")

const typeDefs = gql`
	scalar Date

	type Product {
		name: String!
		price: Float!
		discount: Float
		priceWithDiscount: Float
	}

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
		spotlightProduct: Product
	}
`

const resolvers = {
	Product: {
		priceWithDiscount(product) {
			if (product.discount) {
				return product.price * (1 - product.discount)
			} else {
				return product.price
			}
		}
	},

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
		},
		spotlightProduct() {
			return {
				name: "Gamer Notebook",
				price: 4500.89,
				discount: 0.5
			}
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.log(`- Apollo Server running... [${url}]`)
})