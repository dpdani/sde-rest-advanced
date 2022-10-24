let params = (new URL(location)).searchParams;
let lat = params.get('lat');
let lon = params.get('lon');

var L = require('leaflet');

var map = L.map('map').setView([lat, lon], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
