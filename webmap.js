let params = (new URL(location)).searchParams;
let lat = params.get('lat');
let lon = params.get('lon');

const L = require('leaflet');

const map = L.map('map').setView([lat, lon], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([lat, lon]).addTo(map);