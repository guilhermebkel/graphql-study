const { ApolloServer, gql } = require("apollo-server")

const users = [
	{
		id: 1,
		name: "Mota",
		email: "mota@guilherr.me",
		age: 20
	},
	{
		id: 2,
		name: "Guilherme",
		email: "guilhermebromonschenkel@gmail.com",
		age: 22
	},
	{
		id: 3,
		name: "Daniella",
		email: "dani@gmail.com",
		age: 19
	}
]

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
		lotteryNumbers: [Int!]!
		users: [User!]!
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
		},
		lotteryNumbers() {
			const sort = (a, b) => a - b

			const array = Array(6).fill(0)

			const random = () => parseInt(Math.random() * 60 + 1)

			return array.map(() => random()).sort(sort)
		},
		users() {
			return users
		}
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.log(`- Apollo Server running... [${url}]`)
})