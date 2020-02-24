let id = 1

const nextId = () => id++

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
		id: nextId(),
		name: "Mota",
		email: "mota@guilherr.me",
		age: 20,
		profile_id: 1,
		status: "ACTIVE"
	},
	{
		id: nextId(),
		name: "Guilherme",
		email: "guilhermebromonschenkel@gmail.com",
		age: 22,
		profile_id: 2,
		status: "INACTIVE"
	},
	{
		id: nextId(),
		name: "Daniela",
		email: "dani@gmail.com",
		age: 19,
		profile_id: 1,
		status: "BLOCKED"
	}
]

module.exports = { users, profiles, nextId }