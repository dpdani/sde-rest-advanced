const express = require('express');
const https = require('https');
const router = express.Router();

function isLatitude(lat) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lon) {
  return isFinite(lon) && Math.abs(lon) <= 180;
}

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

module.exports = router;
