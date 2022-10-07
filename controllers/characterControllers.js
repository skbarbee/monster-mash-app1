////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Student = require("../models/character")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()



/////////////////////////////////////////
// Routes
/////////////////////////////////////////
//GET request
//index route
router.get("/", (req, res)=>{
	//in our index route, we want to use moongoos model methods to get our data
	Student.find({})
	.populate("owner","username")
	.populate("comments.author", "username")
	.then(students =>{
		const element = res.body._id
		console.log(element)
	console.log(students.elements)
		const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
	res.render('characters/index',{students,  username, loggedIn, userId })
	})
	.catch(err => console.log(err))
})
// GET for new fruit
// renders the form to create a fruit
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('characters/new', { username, loggedIn, userId })
})

//POST request
//create route -> gives the ability to create new character
router.post("/", (req, res)=>{
	
	req.body.owner = req.session.userId
    console.log('the student from the form', req.body)
	Student.create(req.body)
	.then(student =>{
		res.redirect('characters')
		
	})
	.catch(error => console.log(error))
	

})


//GET request for USER
router.get('/mine', (req,res)=>{
	Student.find({owner: req.session.userId})
	.then(students =>{
		const username = req.session.username
		const loggedIn = req.session.loggedIn
		const userId = req.session.userId
		
		res.render('characters/index', { students, username, loggedIn, userId })
	})
	.catch(error => res.json(error))
})
// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	const studentId = req.params.id

    Student.findById(studentId)
	.then(student =>{
		res.render('characters/edit', { student, username, loggedIn, userId})
	})
	.catch(err => {
		res.redirect(`error?error=${err}`)
	})
})

//PUT request
//Update -> updates a specific character
router.put("/:id",(req,res)=>{
	onsole.log("req.body initially", req.body)
    const id = req.params.id

	Student.findById(id)
		.then(student => {
			if(student.owner == req.session.userId){
				
				return student.updateOne(req.body)
				
			}else{
				res.sendStatus(401)
			}
			
		})
		.then(()=>{
			res.redirect(`/characters/${id}`)
		})
		.catch(err=> res.json(err))
})
//DELETE request
//destroy route-> finds and deletes a single resource(fruit)

router.delete('/:id', (req, res) => {
    // get the student id
    const studentId = req.params.id

    // delete and REDIRECT
    Student.findByIdAndRemove(studentId)
        .then(students => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/characters')
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

//SHOW request
router.get("/:id",(req,res)=>{
	const id = req.params.id
	Student.findById(id)
	.populate("comments.author", "username")
	.then(student =>{
		const username = req.session.username
		const loggedIn = req.session.loggedIn
		const userId = req.session.userId
		res.render('characters/show', { student, username, loggedIn, userId })
	})
	.catch(err => res.redirect(`/error?error=${err}`))
})
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router