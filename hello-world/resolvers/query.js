const { users, projects } = require("../database/mock")

module.exports = {
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
	},
	user(_, { id }) {
		const selectedUser = users.find(user => user.id == id)
		return selectedUser
	},
	profiles() {
		return profiles
	},
	profile(_, { id }) {
		const selectedProfile = profiles.find(profile => profile.id == id)
		return selectedProfile
	}
}