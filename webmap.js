let params = (new URL(location)).searchParams;
let lat, lon;
let events;

const L = require('leaflet');

lat = params.get('lat');
lon = params.get('lon');

console.log("In to Webmap");

const map = L.map('map').setView([lat, lon], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Chiamata ajax --> ritorna events

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "/events", true);
xhttp.setRequestHeader('Content-type', 'application/json');
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {

      // Response
	  console.log("response: ", this.responseText);
      events = JSON.parse(this.responseText);

	  // Set popups
	  if(events !== undefined){
		console.log("LENGHT: ", events.length)
		var markers = L.markerClusterGroup();
		for (var i = 0; i < events.length; i++) {
			console.log("ADDEDD Event: ", events[i]);

			marker = new L.marker([events[i].lat, events[i].lon])
			  .bindPopup(events[i].title);

			markers.addLayer(marker);
		}
		map.addLayer(markers);
	  }
   }
};
xhttp.send();
