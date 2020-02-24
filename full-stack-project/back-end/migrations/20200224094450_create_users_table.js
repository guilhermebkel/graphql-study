
exports.up = function(knex) {
	return knex.schema.createTable("users", table => {
		table.increments("id").primary()
		table.string("name").notNull()
		table.string("email").notNull().unique()
		table.string("password", 60)
		table.boolean("active").notNull().defaultTo(true)
		table.timestamp("created_at").defaultTo(knex.fn.now())
	}).then(function () {
		return knex("users").insert([
			{ name: "João Show", email: "jshow@empresa.com.br", password: "12345678" },
			{ name: "Jaime Lannister", email: "jlann@empresa.com.br", password: "12345678" },
			{ name: "Gabriela T. Nunes", email: "gtnunes@empresa.com.br", password: "12345678" },
		])
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("users")
}
