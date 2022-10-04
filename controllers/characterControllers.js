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
//SEED Route
router.get("/seed", (req, res) => {
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
		  // send created characters as response to confirm creation
			res.json(data)
		  })
	  })
	})
//GET request
//index route
router.get("/", (req, res)=>{
	//in our index route, we want to use moongoos model methods to get our data
	Student.find({})
	.then(students =>{
		res.json({ students : students})
	})
	.catch(err => console.log(err))
})
//POST request
//create route -> gives the ability to create new character
router.post("/", (req, res)=>{
	Student.create(req.body)
	.then(student =>{
		res.status(201).json({ student: student.toObject()})
	})
	.catch(error => console.log(error))
})
//PUT request
//Update -> updates a specific character
router.put("/:id",(req,res)=>{
	//console.log("I hit the update route",req.params.id)
	const id = req.params.id
	// findByIdAndUpdate needs three aruguments, id, req.boyd, and whether it is new
	Student.findByIdAndUpdate(id, req.body, {new:true})
		.then(student =>{
			console.log('the character from update', student)
			res.sendStatus(204)
		})
		.catch(err=> console.log(err))
})
//DELETE request
//destroy route-> finds and deletes a single resource(fruit)

router.delete("/:id",(req,res)=>{
	//grab the id from the request
	const id = req.params.id
	//find and delte the fruit
	Student.findByIdAndRemove(id)
	//send a 204 if successful
	.then((student) =>{
		console.log('the character you deleted', student)
		res.sendStatus(204)
	})
	//send the error if not
	.catch(err => res.json(err))
})

//SHOW request
router.get("/:id",(req,res)=>{
	const id = req.params.id
	Student.findById(id)
	.then(id =>{
		res.json({id:id})
	})
	.catch(err=>console.log(err))
})
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router