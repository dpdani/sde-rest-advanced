const express = require('express');
const https = require('https');
const router = express.Router();

function isLatitude(lat) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lon) {
  return isFinite(lon) && Math.abs(lon) <= 180;
}


module.exports = router;
