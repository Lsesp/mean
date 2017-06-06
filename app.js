const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database using config file
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database '+config.database);
});

//on error
mongoose.connection.on('error', (err) => {
    console.log('database error: '+err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname, "public")));

//body-aprser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//home page
app.get("/", (req,res) => {
    res.send("invalid path");

});

app.listen(port, () => {
    console.log("server running on port: " +port);
});