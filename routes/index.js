const express = require('express');
const fetch  = require('node-fetch');
const router = express.Router();
const lab4client = require('../lab4client/lab4client')
const functions = require('../routes/functions')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log("REDIRECTING POST");
  res.render('index', { title: 'Express' });
});


router.get("/test", async function (req, res, next) {
  const eventIds = await lab4client.searchEvents(45.454967, 11.029849, "", new Date("2022-10-18"));
  let events = await lab4client.prepareEventsForMap(eventIds);
  await res.send(events);
});

var json_events;

router.get("/flow", async function (req, res, next) {
  // Read params
  let lat = req.query.lat;
  let lon = req.query.lon;
  console.log("lat:", lat);
  console.log("lon:", lon);

  // Read lab 4 data 
  const eventIds = await lab4client.searchEvents(lat, lon, "", new Date("2022-10-18"));
  console.log('events list: ', eventIds);
  json_events = await lab4client.prepareEventsForMap(eventIds);
  
  await res.redirect('../?' + new URLSearchParams({lat:lat, lon:lon}));
});    

function setupResponse(response, data, next){
  response.header("Content-Type", "application/json");
  response.body = data;
  next();
}

router.get("/events", async function (req, res, next) {
  console.log("json-event: ", json_events);
  res.header("Content-Type", "application/json");
  res.send(json_events);
});    


router.get('/searchOSM', (req, res, next) => {
  let name = req.query.name;
  fetch('https://nominatim.openstreetmap.org/search?' + new URLSearchParams({
	  q:name,
	  format:'json'
  })).then(async(response)=>{
	  let body = await response.text();
	  let json = JSON.parse(body);
	  res.redirect('../?' + new URLSearchParams({lat:json[0].lat, lon:json[0].lon}));
  });
});

module.exports = router;
