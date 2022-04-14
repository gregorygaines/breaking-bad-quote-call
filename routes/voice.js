const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const fs = require('fs');

const router = express.Router();

// Create the voice endpoint
router.post('/voice', (req, res) => {
  // Get all .mp3 files
  const audioFiles = fs.readdirSync('./public').filter((file) => {
    return file.match(new RegExp('.*\.(mp3)', 'ig'));
  });

  // Choose a random mp3 to play
  const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];

  // Create a voice response
  const voiceResponse = new VoiceResponse();

  // Add a pause because the audio starts too quickly
  voiceResponse.pause({
    length: 1,
  });

  // Generate a TwiML response
  voiceResponse.play({
    loop: 1
  }, randomAudioFile);

  // Return command to play mp3
  res.type('text/xml')
    .status(200).send(voiceResponse.toString());
});

module.exports = router;