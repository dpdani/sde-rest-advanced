const http = require("http");
const https = require("https");
const categories = require("./categories").categories;


const defaultRadius = 1000; // 1km


const searchEvents = async (lat, lon, category, date) => {
    const city = "";
    let endDate = new Date();
    endDate.setUTCDate(date.getUTCDate() + 1);
    let query = `${process.env.LAB_4_URL}/v1/events?`
    if (lat !== undefined && lon !== undefined) {
        query += `&geo=${lon},${lat}`;
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
    if (date !== undefined) {
        query += `&startDate=${date.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    // let query = `${process.env.LAB_4_URL}/v1/events`
    console.log(query);
    const response = await fetch(query);
    // console.log(await response.text());
    const eventIds = await response.json();
    return eventIds.events.map((e) => e.uuid);
}
exports.searchEvents = searchEvents;

const prepareOneEvent = async (eventId) => {
    let url = `${process.env.LAB_4_URL}/v1/events/${eventId}`;
    // console.log(url);
    const response = await fetch(url);
    const content = await response.json();
    // console.log(content);
    return {
        id: eventId,
        title: content.title,
    };
}

const prepareEventsForMap = async (eventIds) => {
    for (let i = 0; i < eventIds.length; i++) {
        eventIds[i] = await prepareOneEvent(eventIds[i]);
    }
    return eventIds;
}
exports.prepareEventsForMap = prepareEventsForMap;
