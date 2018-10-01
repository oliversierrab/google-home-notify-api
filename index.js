const GoogleHome = require('google-home-push');
const express = require('express');

const port = process.env.PORT || 3000;
const devices = {
  'living': 'Home Speaker', // Set name or IP
  'master': '192.168.86.1'
}
const app = express();

function speakTo(text, device) {
  const myHome = new GoogleHome(device);
  text = text.replace(/\+/g, ' ');
  myHome.speak(text);
};

app.get('/', (req, res) => {
  res.send('GoogleHome Speak API');
});

app.get('/googlehome/api/speak/:text', (req, res) => {
  let text = req.params.text;
  if (!text) {
    return res.status(400).send('No text was provided');
  }
  speakTo(text, devices.living);

  res.status(200).send(text);
});

app.get('/googlehome/api/speakto/:device/:text', (req, res) => {
  const device = req.params.device;
  let text = req.params.text;
  if (!text || !device || !devices[device]) {
    return res.status(400).send('No text/Device was provided or device does is not registered');
  }
  speakTo(text, devices[device]);

  res.status(200).send(text);
});

app.listen(port, () => {
  console.log(`Listening for request on port: ${ port }`);
});
