///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Student = require("../models/character")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
// save the connection in a variable
const db = mongoose.connection
console.log('db in seed', db)
db.on('open', () => {
	const theHeirs = [
	{name:"Seth Capella", nickname:["Wolfman"], age: 20, zodiacSign:"aquarius", order:"Werewolf", house:"aer", elements: ["air", "earth"]
	// 	fire: false,
	// 	water:false,
	// 	air: true,
	// 	earth: true
	// }]
	},
	
	{name:"Caleb Altair", nickname:["Cal"], age: 20, zodiacSign:"taurus", order:"Vampire", house:"terra", elements:["fire","earth"]
	// 	fire: true,
	// 	water:false,
	// 	air: false,
	// 	earth: true
	// }]
	},
	
	{name:"Darius Acrux", nickname:["Dragzilla","Dragon Boy","Dari"], age: 20, zodiacSign:"leo", order:"Dragon", house:"ignis", elements:["fire","water"]
	// 	fire: true,
	// 	water:true,
	// 	air: false,
	// 	earth: false
	// }]
	},
	
	{name:"Max Rigel", nickname:["Bothersome Carracuda"], age: 20, zodiacSign:"pisces", order:"Siren", house:"aqua", elements:["water","air"]
	// 	fire: false,
	// 	water:true,
	// 	air: true,
	// 	earth: false
	// }]
	},
	
	]
	Student.deleteMany()
	.then((deletedStudents) => {
		console.log('this is what .deleteMany returns', deletedStudents)
		// Seed Starter characters
		Student.create(theHeirs)
		.then((data) => {
			console.log('Here are the new seed Students',data)
		 //always remember to close connection to db 
            db.close()
		})
		.catch(error => {
			console.log(error)
		//always remember to close connection to db
			db.close()
		})
	})
	.catch(error => {
        console.log(error)
		//always remember to close connection to db
        db.close()
    })
})
	