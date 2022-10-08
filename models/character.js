////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
const mongoose = require('./connection')
const User = require('./user')
const commentSchema = require('./comment')
// pull schema and model from mongoose
const { Schema, model } = mongoose

// // make sub document 
// const elementsSchema = new Schema({
//   fire: {
//     type: Boolean},
//   water:{ 
//     type: Boolean},
//   air:{ 
//   type: Boolean},
//   earth:{ 
//     type: Boolean}
// })

// make  schema
const studentSchema = new Schema({
  name: String,
  nickname: String,
  age: Number,
  zodiacSign:{ 
	type: String,
	enum: ['aries', 'taurus','gemini', 'cancer','leo', 'virgo','libra', 'scorpio','sagittarius', 'capricorn','aquarius', 'pisces',]},
  order: String,
  house: {
	type: String,
	enum:['ignis','aer','terra','aqua']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  elements: String,
  comments: [commentSchema]


})

// make model
const Student = model("Character", studentSchema)
// const Element = model(Element, elementsSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Student;
