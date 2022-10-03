////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
const mongoose = require("mongoose")
// pull schema and model from mongoose
const { Schema, model } = mongoose

// make  schema
const studentSchema = new Schema({
  name: String,
  nickname: [String],
  age: Number,
  zodiacSign:{ 
	type: String,
	enum: ['aries', 'taurus','gemini', 'cancer','leo', 'virgo','libra', 'scorpio','sagittarius', 'capricorn','aquarius', 'pisces',]},
  order: String,
  house: {
	type: String,
	enum:['ignis','aer','terra','aqua']
  },
  elements:[String]


})

// make model
const Student = model("Character", studentSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Student;
