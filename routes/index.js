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
router.get("/test", async function (req, res) {
  const eventIds = await lab4client.searchEvents(45.454967, 11.029849, "");
  let events = await lab4client.prepareEventsForMap(eventIds);
  await res.send(events);
});

// GLOBAL variable - to be sent in '/events'
let json_events;

// GET test lab4 APIs
router.get("/events", async function (req, res, next) {
  console.log("json-event: ", json_events);
  res.header("Content-Type", "application/json");
  res.send(json_events);
});

// flow: given coordinates retrieve JSON with events near the coordinates
async function flow(lat, lon, cat){
  // Read lab 4 data 
  // Write your code here - exercise 2
  const eventIds = await lab4client.searchEvents(lat, lon, cat);
  json_events = await lab4client.prepareEventsForMap(eventIds);
}

// GET flow function - given lat & lon, retrieve JSON with events
router.get("/flow", async function (req, res, next) {
  // Read params
  let lat = req.query.lat;
  let lon = req.query.lon;
  // Write your code here - exercise 2
  let cat = req.query.cat;

  // Query REST basic to get data
  // Write your code here - exercise 2
  await flow(lat, lon, cat);

  // Redirect to standard route --> '/' 
  await res.redirect('../?' + new URLSearchParams({lat:lat, lon:lon}));
});
  

// GET searchOSM function
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
    console.log("LATITUDE: " , lat);
    console.log("LONGITUDE: ", lon);

    // Mini assignment - Your code here
    await flow(lat, lon, "");

    // Redirect to standard route --> '/' 
    await res.redirect('../?' + new URLSearchParams({lat:lat, lon:lon}));
  });
});

module.exports = router;
