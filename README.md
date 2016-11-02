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