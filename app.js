require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
// laczenie z baza danychh
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@project1lab01.yajtr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=PROJECT1LAB01`)
//  mongodb+srv://bibliotekarz:bib123@project1lab01.yajtr.mongodb.net/?retryWrites=true&w=majority&appName=PROJECT1LAB01
const morgan = require("morgan")
app.use(morgan("dev"))
const bodyParser = require("body-parser")
// logger
app.use(bodyParser.json()) //od tej pory w req.body mam informacje z części body

const ksiazkiRoutes = require("./api/router/ksiazki")
const autorzyRoutes = require("./api/router/autorzy")
const klienciRoutes = require("./api/router/klienci")
const userRoutes = require("./api/router/users")





//stosuje routy
app.use("/ksiazki",ksiazkiRoutes)
app.use("/autorzy", autorzyRoutes)
app.use("/klienci", klienciRoutes)
app.use("/users", userRoutes)

// obsluga błędów
app.use((req, res, next) => {
    res.status(404).json({wiadomość: "Not Found, błąd routu"})
})

module.exports = app