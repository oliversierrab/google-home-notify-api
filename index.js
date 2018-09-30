const GoogleHome = require('google-home-push');
const express = require('express');

const device = 'Living Room speaker';
const port = process.env.PORT || 3000;

const app = express();


app.get('/', (req, res) => {
  res.send('GoogleHome Speak API');
});

app.get('/googlehome/api/speak/:text', (req, res) => {
  let text = req.params.text;
  if (!text) {
    return res.status(400).send('No text was provided');
  }

  const myHome = new GoogleHome(device);
  text = text.replace(/\+/g, ' ');
  myHome.speak(text);

  res.status(200).send(text);
});

app.listen(port, () => {
  console.log(`Listening for request on port: ${ port }`);
});
