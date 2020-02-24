
exports.up = function(knex) {
  return knex.schema.createTable("profiles", table => {
    table.increments("id").primary()
    table.string("name").notNull().unique()
    table.string("label").notNull()
  }).then(function () {
    return knex("profiles").insert([
      { name: "common", label: "Common" },
      { name: "admin", label: "Administrator" },
    ])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("profiles")
}
