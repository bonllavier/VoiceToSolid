var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('public'));

var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/templates/home2.html'));
    } else {
        response.send('Please login to view this page!');
    }
});

app.get('/aboutus', function (request, response) {
    response.sendFile(path.join(__dirname + '/templates/aboutus.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/templates/login.html'));
})

app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname + '/templates/signup.html'));
})

/* route to handle login and registration */
app.post('/api/register', registerController.register);
app.post('/api/authenticate', authenticateController.authenticate);

console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

app.listen(3000);
