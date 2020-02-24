const databaseConfig = require("../../config/database")

const knex = require("knex")

const database = knex(databaseConfig)

module.exports = database