const axios = require("axios");
const fs = require("fs");

//Converts degree to radians
const degree_to_radians = degrees => {
  var pi = Math.PI;
  return degrees * (pi / 180);
};

//Convert meters to miles
const meters_to_miles = meters => {
  return meters * 0.000621;
};

//Using the latitudes and longitudes, it gives out the distance between us and the airport
const GetDistance = (x1, y1, x2, y2) => {
  var R = 6371e3; // metres
  const lat1 = x1;
  const lat2 = x2;
  const lon1 = y1;
  const lon2 = y2;
  var φ1 = degree_to_radians(lat1);
  var φ2 = degree_to_radians(lat2);
  var Δφ = degree_to_radians(lat2 - lat1);
  var Δλ = degree_to_radians(lon2 - lon1);

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;

  return meters_to_miles(d);
};

//Filters out all airports to airports in radius of 100 miles
const GetNearbyAirports = (x, y) => {
  const airports_nearby = [];
  var airport_object = {};
  var rawdata = fs.readFileSync("./mock/airports.json");
  let response = JSON.parse(rawdata);
  const nearby = response.filter(
    radius =>
      radius.latitude >= x - 1.5 &&
      radius.latitude <= x + 1.5 &&
      radius.longitude >= y - 1.5 &&
      radius.longitude <= y + 1.5
  );

  //Extract amt, airport code
  for (var i = 0; i < nearby.length; i++) {
    lat = nearby[i].latitude;
    lng = nearby[i].longitude;
    airport_code = nearby[i].code;
    const data = GetDistance(x, y, lat, lng);
    airport_object[airport_code] = { data, lat, lng };
  }
  return airport_object;
};

//Main function, call this from nodejs server to start the program.

//FIND DISTANCE BETWEEM DEST and Start AND USE IT TO FIND COST
const main_airports = (x1, y1, x2, y2) => {
  const distance_dest = GetNearbyAirports(x1, y1); //x,y //data would be receive from the user (When clicked);
  const distance_depart = GetNearbyAirports(x2, y2);
  return { distance_dest, distance_depart };
};

module.exports = {
  main_airports
};
