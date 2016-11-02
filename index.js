
var bodyParser = require('body-parser')
var express = require('express')
var expressValidator = require('express-validator')
var Measurement = require('./models/measurement')
var mongoose = require('mongoose')

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
      res.status(400).json({message: 'Invalid post parameter(s)'})
      return
    }
    //TODO: Insert into db
    res.status(200).json({message: 'Success!'})
  })





//Start
app.use('/api', router);
app.listen(port);
console.log('Server listening on ' + port);
