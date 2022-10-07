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
const app = require("liquid-express-views")(express())

/////////////////////////////////////////////
//Middleware
/////////////////////////////////////////////

middleware(app)


/////////////////////////////////////////////
//Home Route
/////////////////////////////////////////////
app.get("/",(req, res)=>{
	res.render('index.liquid')
})
/////////////////////////////////////////////
//Register Routes
/////////////////////////////////////////////
app.use('/characters',CharacterRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

// this renders an error page, gets the error from a url request query
app.get('/error', (req, res) => {
    // get session variables
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', { error, username, loggedIn, userId })
})

// this is a catchall route, that will redirect to the error page for anything that doesn't satisfy a controller
app.all('*', (req, res) => {
    res.redirect('/error')
})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))