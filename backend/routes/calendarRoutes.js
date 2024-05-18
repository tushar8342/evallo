const express = require('express');
const fs = require('fs');
const { google } = require('googleapis');
const { authorize } = require('../utils/googleAuth');
const { listEvents, createEvent } = require('../utils/calendarFunctions');
const router = express.Router();

let var_arr = ["Refresh the browser to see your events!"];

router.get('/', (req, res) => {
  res.send("Hello from get");
});

router.post('/', (req, res) => {
  const code = req.body.code;

  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), (auth) => listEvents(auth, var_arr));
  });

  res.send(var_arr);
});

router.post('/events', (req, res) => {
  const { summary, description, to } = req.body;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  createEvent(oAuth2Client, { summary, description });

  const msg = {
    to: to,
    from: "johndoe@gmail.com",
    subject: summary,
    text: description,
    html: description,
  };

  console.log(msg);
  res.status(200).send("Event and email scheduled successfully");
});

module.exports = router;
