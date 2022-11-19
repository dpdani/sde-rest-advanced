const http = require("http");
const https = require("https");
const categories = require("./categories").categories;


const defaultRadius = 10000; // 10km


const searchEvents = async (lat, lon, category) => {
    const city = "";
    let query = `${process.env.LAB_4_URL}/v1/events?`
    if (lat !== undefined && lon !== undefined) {
        query += `&geo=${lat},${lon}`;
    }
    if (defaultRadius !== undefined) {
        query += `&radius=${defaultRadius}`;
    }
    if (city !== "") {
        query += `&city=${city}`;
    }
    if (category !== "") {
        query += `&category=${category}`;
    }
    // let query = `${process.env.LAB_4_URL}/v1/events`
    console.log(query);
    const response = await fetch(query);
    //console.log(await 'response from lab 4:', response.text());
    const eventIds = await response.json();
    //console.log('ids server before mapping: ',eventIds);
    return eventIds.events.map((e) => e.uuid);
}
exports.searchEvents = searchEvents;

const prepareOneEvent = async (eventId) => {
    let url = `${process.env.LAB_4_URL}/v1/events/${eventId}`;
    // console.log(url);
    const response = await fetch(url);
    const content = await response.json();
    //console.log("JSON CONTENT FROM LAB4: ", content);
    return {
        id: eventId,
        title: content.title,
        // Your code here for category
        lat: content.physicalAddress.geo.coordinates[0],
        lon: content.physicalAddress.geo.coordinates[1]
    };
}

const prepareEventsForMap = async (eventIds) => {
    console.log("server-side events lenght: ", eventIds.length)
    for (let i = 0; i < eventIds.length; i++) {
        eventIds[i] = await prepareOneEvent(eventIds[i]);
    }
    return eventIds;
}
exports.prepareEventsForMap = prepareEventsForMap;
