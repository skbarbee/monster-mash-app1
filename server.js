/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const path = require("path") // import path module
const CharacterRouter = require('./controllers/characterControllers')
const CommentRouter = require('./controllers/commentControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')

/////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////
//Middleware
/////////////////////////////////////////////

middleware(app)


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
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))