const express = require('express');
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

module.exports = router;
