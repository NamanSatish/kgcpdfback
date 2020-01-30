const express = require('express');
const localtunnel = require('localtunnel');
// var cors = require('cors'); // cors is no longer needed because we set the headers , manually
// app.use(cors()); // This is one way to make express respond to chrome CORS with the allow-control-allow-orgin headers, however it hasn't always worked when I tried to set it up

const https = require('https');
const fs = require('fs');
const app = express();


app.use((req, res, next) => { // This is in the index file to make sure that it is run first (before the other routes are used). This ensures that express responds with these headers anytime a request is made. 
    //console.log(req);
    //console.log(res);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Creator", "Naman Satish")
    console.log("OPTIONS - Request recieved!");
    next();
});



// First route
app.get('/*', (req, res) => { // this is the route if nothing is set after the port number
    res.json({ warning: 'Nothing to see here Citizen. Move along.' })
})
// Starting server
const port = 3000;
app.listen(port); // this is the port that the server is on
console.log(`Listening on ${port}`);

const morgan = require('morgan');
app.use(morgan('tiny')) // Start Morgan after the server starts listening?
app.use(express.json({limit: '999mb'})) // express.json is reading the response and requests, and only reads them if they are JSON. It accepts unicode and automatically inflates gzip and deflate (two encoding methods)
app.use(express.urlencoded({limit: '999mb' , extended: true })) // This allows json returns to have nested objects ex. {Earth : {Continents : {North America, South America , ...}}}
app.use(require('./routes/index.routes')) // This gives it the specific extension after the port number "/api/v1/posts"


// To start the server use npm run dev or npm run start (same thing)
