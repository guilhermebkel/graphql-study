
exports.up = function(knex) {
	return knex.schema.createTable("users_profiles", table => {
		table.integer("user_id").unsigned()
		table.integer("profile_id").unsigned()
		table.foreign("user_id").references("users.id")
		table.foreign("profile_id").references("profiles.id")
		table.primary(["user_id", "profile_id"])
	}).then(function () {
		return knex("users_profiles").insert([
			{ user_id: 1, profile_id: 2 },
			{ user_id: 1, profile_id: 3 },
			{ user_id: 2, profile_id: 2 },
			{ user_id: 3, profile_id: 1 },
		])
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("users_profiles")
}
