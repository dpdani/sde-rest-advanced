let params = (new URL(location)).searchParams;
let lat, lon;

const L = require('leaflet');

lat = params.get('lat');
lon = params.get('lon');

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
      let events = JSON.parse(this.responseText);
	  
	  // Set popups
	  if(events !== undefined){
		console.log("LENGHT: ", events.length)
		var markers = L.markerClusterGroup();
		for (var i = 0; i < events.length; i++) {
			// Create new marker
			marker = new L.marker([events[i].lat, events[i].lon])
			.bindPopup(events[i].title + "<br/>[" + events[i].cat + "]" /*Write your code here - exercise 1*/);
			// Adding the marker into a Layer
			markers.addLayer(marker);
		}
		// Adding the layer into the map
		map.addLayer(markers);
	  }
   }
};
xhttp.send();
