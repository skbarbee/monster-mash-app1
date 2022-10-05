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
	.then(students =>{
	res.json({ students : students})
	})
	.catch(err => console.log(err))
})
//POST request
//create route -> gives the ability to create new character
router.post("/", (req, res)=>{
	req.body.owner = req.session.userId
	Student.create(req.body)
	.then(student =>{
		res.status(201).json({ student: student.toObject()})
	})
	.catch(error => console.log(error))
})

//GET request for USER
router.get('/mine', (req,res)=>{
	Student.find({owner: req.session.userId})
	.then(students =>{
		res.status(200).json({students: students})
	})
	.catch(error => res.json(error))
})
//PUT request
//Update -> updates a specific character
router.put("/:id",(req,res)=>{
	//console.log("I hit the update route",req.params.id)
	const id = req.params.id

	Student.findById(id)
		.then(student => {
			if(student.owner == req.session.userId){
				res.sendStatus(204)
				return student.updateOne(req.body)
				
			}else{
				res.sendStatus(401)
			}
			
		})
		.catch(err=> res.json(err))
})
//DELETE request
//destroy route-> finds and deletes a single resource(fruit)

router.delete("/:id",(req,res)=>{
	//grab the id from the request
	const id = req.params.id
	//find and delte the fruit
	Student.findById(id)
	//send a 204 if successful
	.then((student) =>{
		if(student.owner == req.session.userId){
			res.sendStatus(204)
			return student.deleteOne()
		}else{
			res.sendStatus(401)
		}
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