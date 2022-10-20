const express = require("express");
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000
const bodyParser = require("body-parser")

//Error handling, customizable code and message
/*
function errorHandling(res, code, message) {
    error = {}
    error.code = code
    error.message = message
    res.status(code).send(error)
}
*/
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isLatitude(lat) {
    return isFinite(lat) && Math.abs(lat) <= 90;
  }

function isLongitude(lon) {
  return isFinite(lon) && Math.abs(lon) <= 180;
}


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//home page
// http://localhost:3000/
app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`<!DOCTYPE html>
    <html>
    <body>
    
    <h1>NearMe Events</h1>
    
    <form action="/lat-lon-coordinates" method="post">
        <label for="lat">Latitude:</label>
        <input type="text" id="lat" name="lat"><br><br>
        <label for="lon">Longitude:</label>
        <input type="text" id="lon" name="lon"><br><br>
        <input type="submit" value="Submit">
    </form>
    
    </body>
    </html>
    
    `)
})


//input geo-coordinates

app.post('/lat-lon-coordinates', function (req, res) {
    if (isLatitude(req.body.lat) & isLongitude(req.body.lon)){
        var lat = req.body.lat;
        var lon = req.body.lon;
        //sleep(300);
        var options = {
          headers: {'User-Agent': 'some app v1.3 (example@gmail.com)'},
          host: 'nominatim.openstreetmap.org',
          method: 'GET',
          path: `/reverse?lat=${lat}&lon=${lon}&format=json`
        };
        
        var req = https.request(options, function(res) {
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
        //refresh previuous html page on main URL
    }
    
})




/*
https.get('', (resp) => {
  let data = '';
  
  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log('headers:', resp.headers);
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

*/





// server starts on http://localhost:3000 aka http://127.0.0.1:3000
// error handling for failed connection

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}.`)
}).on('error', (err) => {
    console.log('\nError 500: unable to start server')
})


