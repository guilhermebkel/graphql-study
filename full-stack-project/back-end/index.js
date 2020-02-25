const dotenv = require("dotenv")

const app = require("./src")

dotenv.config()
app.boot()