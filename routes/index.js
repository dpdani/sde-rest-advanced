const express = require('express');
const fetch  = require('node-fetch');
const router = express.Router();
const lab4client = require('../lab4client/lab4client')
const functions = require('../routes/functions')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/test", async function (req, res, next) {
  const eventIds = await lab4client.searchEvents(45.454967071564106, 11.02984920555249, "", new Date("2022-10-18"));
  let events = await lab4client.prepareEventsForMap(eventIds);
  await res.send(events);
});

/* POST lat lon coordinate listing. */
router.post('/', function(request, res, next) {
  if (isLatitude(request.body.lat) && isLongitude(request.body.lon)){
    const lat = request.body.lat;
    const lon = request.body.lon;

    const options = {
      headers: {'User-Agent': 'some app v1.3 (example@gmail.com)'},
      host: 'nominatim.openstreetmap.org',
      method: 'GET',
      path: `/reverse?lat=${lat}&lon=${lon}&format=json`
    };

    const req = https.request(options, function (res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    
    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();
  } else {
    //refresh previous html page on main URL
  }
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
