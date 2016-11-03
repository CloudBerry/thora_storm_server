
var bodyParser = require('body-parser')
var express = require('express')
var expressValidator = require('express-validator')
var Measurement = require('./models/measurement')
var mongoose = require('mongoose')
var url = require('./dbconfig.js')

/* dbconfig.js contains database url:
const url = 'mongodb://...'
module.exports = url
*/

var app = express()

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator())

var port = process.env.PORT || 8080;
var router = express.Router();


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.status(200).json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here


router.route('/measurements')
  .post((req, res) => {
    //Check that parameters are set
    req.checkBody('temp', 'Invalid postparam').notEmpty().isFloat()
    req.checkBody('hum', 'Invalid postparam').notEmpty().isFloat()
    req.checkBody('co2', 'Invalid postparam').notEmpty().isFloat()
    req.checkBody('dust', 'Invalid postparam').notEmpty().isFloat()
    if (req.validationErrors()) {
      res.status(422).json({message: 'Invalid post parameter(s)'})
      return
    }
    //TODO: Insert into db
    let measurement = new Measurement()
    measurement.time = Date.now()
    measurement.temp = req.body.temp
    measurement.hum = req.body.hum
    measurement.co2 = req.body.co2
    measurement.dust = req.body.dust

    measurement.save((err) => {
      if (err) {
        console.log(err)
        res.status(500).json({message: 'Error saving data'})
      } else {
        res.status(201).json({message: 'Record inserted'})
      }
    })
  })
  .get((req, res) => {
    Measurement.find((err, measurements) => {
      if (err) {
        res.status(500).json({message: 'Error reading from database'})
      } else {
        res.status(200).json(measurements)
      }
    })
  })

router.route('/measurements/last/:period')
  .get((req, res) => {
    let timelimit = Date.now()
    switch (req.params.period) {
      case 'hour':
        timelimit -= 3600000
        break
      case 'day':
        timelimit -= 86400000
        break
      case 'week':
        timelimit -= 604800000
        break
      case 'month':
        timelimit -= 2419200000
        break
      case 'year':
        timelimit -= 29030400000
        break
      default:
        res.status(404).json({message: "404 Not Found"})
        return
    }

    Measurement.find().where('time').gte(timelimit).exec((err, measurements) => {
      if (err) {
        res.status(500).json({message: 'Error reading from database'})
      } else {
        res.status(200).json(measurements)
      }
    })


  })





//Start
app.use('/api', router);
app.listen(port);
console.log('Server listening on ' + port);
mongoose.connect(url)
