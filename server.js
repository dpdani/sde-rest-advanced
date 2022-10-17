const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const bodyParser = require("body-parser")

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// http://localhost:3000/
app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<!DOCTYPE html>
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

app.post('/lat-lon-coordinates', function (req, res) {
   console.log(req.body.lat)
   console.log(req.body.lon)
})

// server starts on http://localhost:3000 aka http://127.0.0.1:3000
// error handling for failed connection
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}.`)
}).on('error', (err) => {
    console.log('\nError 500: unable to start server')
})

