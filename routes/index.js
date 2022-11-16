const express = require('express');
const fetch  = require('node-fetch');
const router = express.Router();
const lab4client = require('../lab4client/lab4client')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/test", async function (req, res, next) {
  const eventIds = await lab4client.searchEvents(45.45, 11.02, "", new Date("2022-10-17T18:00:00Z"));
  let events = await lab4client.prepareEventsForMap(eventIds);
  await res.send(events);
});


router.get('/searchOSM', (req, res, next) => {
  let name = req.query.name;
  fetch('https://nominatim.openstreetmap.org/search?' + new URLSearchParams({
	  q:name,
	  format:'json'
  })).then(async(response)=>{
	  let body = await response.text()
	  let json = JSON.parse(body)
    console.log(req.path);
    req.path = "/";
    console.log(req.path);
	  res.redirect('../?' + new URLSearchParams({lat:json[0].lat, lon:json[0].lon}))
  });
});

module.exports = router;
