const express = require('express')
const bodyParser = require('body-parser')
const {server_config} = require("./src/config/config")
const app = express()
const port = server_config.port

// API route functions from the data models
const userAPI = require('./data/models/auth')

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());
// Accept these headers to avoid CORS errors on the client side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


///////////////////// Routes /////////////////////
// Default Route
app.get('/', (req, res) => res.send("Welcome to Kernel Panic, gammac neh!"))

// Auth routes
app.post('/api/user/signin', customerAPI.signInCustomerAsync)

// log listining port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})