var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MeasurementSchema = new Schema({
  time: Number,
  temp: Number,
  hum: Number,
  co2: Number,
  dust: Number
})

module.exports = mongoose.model('Measurement', MeasurementSchema)
