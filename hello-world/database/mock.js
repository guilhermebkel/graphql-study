const profiles = [
	{
		id: 1,
		type: "common"
	},
	{
		id: 2,
		type: "administrator"
	}
]

const users = [
	{
		id: 1,
		name: "Mota",
		email: "mota@guilherr.me",
		age: 20,
		profile_id: 1
	},
	{
		id: 2,
		name: "Guilherme",
		email: "guilhermebromonschenkel@gmail.com",
		age: 22,
		profile_id: 2
	},
	{
		id: 3,
		name: "Daniella",
		email: "dani@gmail.com",
		age: 19,
		profile_id: 1
	}
]

module.exports = { users, profiles }