var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const multer = require('multer');
const fs = require('fs');

const upload = multer();

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('public'));

var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');
var verifyShape = require('./session/verif_shape');
var verifyColor = require('./session/verif_color');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/templates/home2.html'));
    } else {
        response.sendFile(path.join(__dirname + '/templates/login.html'));
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

app.get('/apiuser', function (req, res) {
    res.json({ "username": req.session.username });
})

/* route to handle login and registration */
app.post('/api/register', registerController.register);
app.post('/api/authenticate', authenticateController.authenticate);

console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

//POST METHOD TO VERIFY IN THE DATABASE IS SHAPE EXIST
app.post('/session/verif_shape', verifyShape.verifyshape);
//POST METHOD TO VERIFY IN THE DATABASE IS COLOR EXISTXCV
app.post('/session/verif_color', verifyColor.verifycolor);

/* sound capture and use of speech api */
async function testGoogleTextToSpeech(audioBuffer) {
    const speech = require('@google-cloud/speech');
    const client = new speech.SpeechClient({ keyFilename: "./apikey/APIKey.json" });

    const audio = {
        content: audioBuffer.toString('base64'),
    };
    const config = {
        languageCode: 'en-US',
    };
    const request = {
        audio: audio,
        config: config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    return transcription;
}

app.post('/upload_sound', upload.any(), async (req, res) => {
    console.log("Getting text transcription..");
    let transcription = await testGoogleTextToSpeech(req.files[0].buffer);
    console.log("Text transcription: " + transcription);
    res.status(200).send(transcription);
});

/* end sound capture and use of speech api */

app.listen(3000);
