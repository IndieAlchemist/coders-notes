const express = require('express');
const routes = require('./routes');

//DATABASE CONNECTION
require('./helpers/databaseConnection');

//IMPORT MIDDLEWARE


//INITIALIZE SERVER
const app = express();

//APP MIDDLEWARE

app.use(express.json());

//APP ROUTES
app.get('/', (req, res) => {
    res.send('Hello World! This is home');
})
app.use(routes);

//APP ERROR HANDLERS



module.exports = app;