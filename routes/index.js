const { json } = require('express');
const express = require('express');
const fetch  = require('node-fetch');
const router = express.Router();
const lab4client = require('../lab4client/lab4client')
const functions = require('../routes/functions')

// GET home page - render index page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET test lab4 APIs
router.get("/test", async function (req, res, next) {
  const eventIds = await lab4client.searchEvents(45.454967, 11.029849, "", new Date("2022-10-18"));
  let events = await lab4client.prepareEventsForMap(eventIds);
  await res.send(events);
});

// GLOBAL variable - to be sended in '/events'
var json_events;

// GET test lab4 APIs
router.get("/events", async function (req, res, next) {
  console.log("json-event: ", json_events);
  res.header("Content-Type", "application/json");
  res.send(json_events);
});

// flow: given coordinates retrive JSON with events near the coordinates
async function flow(lat, lon){
  // Read lab 4 data 
  const eventIds = await lab4client.searchEvents(lat, lon, "");
  json_events = await lab4client.prepareEventsForMap(eventIds);
}

// GET flow function - given lat & lon, retrive JSON with events 
router.get("/flow", async function (req, res, next) {
  // Read params
  let lat = req.query.lat;
  let lon = req.query.lon;

  // Query REST basic to get data
  await flow(lat, lon);

  // Redirect to standard route --> '/' 
  await res.redirect('../?' + new URLSearchParams({lat:lat, lon:lon}));
});
  

// GET searchOSM function - given a name, retrieve JSON with events
router.get('/searchOSM', (req, res, next) => {
  // Read params
  let name = req.query.name;
  
  // Query nominatim to get the place data (coordinates)
  fetch('https://nominatim.openstreetmap.org/search?' + new URLSearchParams({q:name, format:'json'})).then(async(response)=>{
    // Read the response
	  let body = await response.text();
	  let json = JSON.parse(body);

    // Extract coordinates
    let lat = json[0].lat;
    let lon = json[0].lon;

    // Exercise 3 - Your code here
    await flow(lat, lon);
    
    // Redirect to standard route --> '/' 
    await res.redirect('../?' + new URLSearchParams({lat:lat, lon:lon}));
  });
});

module.exports = router;
