/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require('./models/connection') // import mongoose
const path = require("path") // import path module
const CharacterRouter = require('./controllers/characterControllers')
/////////////////////////////////////////////
// Import Our Models
/////////////////////////////////////////////
const Student = require('./models/character')


/////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////
//Middleware
/////////////////////////////////////////////

app.use(morgan("tiny")) //logging
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
app.use(express.json()) // parses incoming requests with JSON payloads


/////////////////////////////////////////////
//Home Route
/////////////////////////////////////////////
app.get("/",(req, res)=>{
	res.send("your server is running ... better catch it")
})
/////////////////////////////////////////////
//Register Routes
/////////////////////////////////////////////
app.use('/characters',CharacterRouter)

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))