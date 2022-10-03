/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require("mongoose") // import mongoose
const path = require("path") // import path module

/////////////////////////////////////////////
// Import Our Models
/////////////////////////////////////////////
const Student = require('./models/character')

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))
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
//Routes
/////////////////////////////////////////////

app.get("/",(req, res)=>{
	res.send("your server is running ... better catch it")
})

app.get("/characters/seed", (req, res) => {
	// array of starter characters
	const theHeirs = [
	{name:"Seth Capella", nickname:["Wolfman"], age: 20, zodiacSign:"aquarius", order:"Werewolf", house:"aer",elements:['air','earth']},

	{name:"Caleb Altair", nickname:["Cal"], age: 20, zodiacSign:"taurus", order:"Vampire", house:"terra",elements:['fire','earth']},

	{name:"Darius Acrux", nickname:["Dragzilla","Dragon Boy","Dari"], age: 20, zodiacSign:"leo", order:"Dragon", house:"ignis",elements:['fire','water']},

	{name:"Max Rigel", nickname:["Bothersome Carracuda"], age: 20, zodiacSign:"pisces", order:"Siren", house:"aqua",elements:['water','air']},

	]

	  // Delete all characters
	  Student.deleteMany({})
	  .then((data) => {
		// Seed Starter characters
		Student.create(theHeirs)
		  .then((data) => {
		  // send created fruits as response to confirm creation
			res.json(data)
		  })
	  })
	})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))