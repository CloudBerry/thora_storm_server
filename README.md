# Thora Storm VGS Server

A simple rest api that connects to a mongodb instance to store and retrieve environmental sensor data. Note that the project is still in development, so several (or all) parts may be more or less broken. 

## Structure

```
thora_storm_server/
├── dbconfig.js
├── index.js
├── models
│   └── measurement.js
├── package.json
└── README.md
```

**dbconfig.js** contains the url to the mongodb server used. For security purposes it is not included in the repository. It should have the following format:

```javascript
const url = "mongodb://<dbuser>:<dbpassword>@dbhost:port/db_name"
module.exports = url
```

**index.js** contains the server code. 

## Access Points

Here are the currently supported access points for the API (all data is returned in JSON format):

#### /api/measurements/

**GET:** Returns all measurements stored in the database

**POST:** Send a new measurement to the database. Make sure the post request has the following form encoded parameters (all are numbers):

* temp
* hum
* co2
* dust

#### /api/measurements/last/hour

**GET:** Returns all measurements recorded the last hour

#### /api/measurements/last/day

**GET:** Returns all measurements recorded the last 24 hours

#### /api/measurements/last/week

**GET:** Returns all measurements recorded the last week

#### /api/measurements/last/month

**GET:** Returns all measurements recorded the last month

#### /api/measurements/last/year

**GET:** Returns all measurements recorded the last year

## Contact

If you have any questions regarding the software, contact Espen Meidell \<espen.meidell@gmail.com\>