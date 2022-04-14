const express = require('express');
const path = require('path');
const http = require('http');
const ngrok = require('ngrok');

// Init .env variables
require('dotenv').config();

// Init Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Add routes
const voiceRouter = require('./routes/voice');
const twilio = require("twilio");
app.use(voiceRouter);

// Set-up port
const port = '3000';
app.set('port', port);

// Create server
const server = http.createServer(app);

// Listen on port
server.listen(port, () => {
  console.log("Started server");

  ngrok.connect({
    addr: 3000,
  }).then((ngrokUrl) => {
    console.log("Connected to url: " + ngrokUrl);

    // Append voice endpoint to ngrokUrl
    const voiceUrl = `${ngrokUrl}/voice`;

    // Create Twilio client
    const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Call a phone number using the
    // command from the /voice endpoint.
    twilioClient.calls.create({
      to: '<TARGET_PHONE_NUMBER',
      from: process.env.TWILIO_NUMBER,
      url: voiceUrl,
      method: 'POST'
    }).then((call) => {
      console.log(call);
    }).catch((err) => {
      console.log("Error making call " + err);
    });
  });
});

// Clean-up code
process.on('exit', () => {
  ngrok.kill();
});

module.exports = app;