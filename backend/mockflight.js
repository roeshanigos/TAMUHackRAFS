const fs = require("fs");

const randomFlightNumber = () => {
  return Math.floor(Math.random() * 10000);
};

const randomFlightModel = () => {
  model = [
    "Boeing 737",
    "Boeing 747",
    "Airbus A380",
    "Bombardier",
    "Boeing 787 Dreamliner",
    "Lockheed Constellation",
    "Airbus A330"
  ];
  const arr = Math.floor(Math.random() * 7);
  return model[arr];
};

//Converts degree to radians
const degree_to_radians = degrees => {
  var pi = Math.PI;
  return degrees * (pi / 180);
};

//Convert meters to miles
const meters_to_miles = meters => {
  return meters * 0.000621;
};

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

const GetDeparturetime = () => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return { hours, minutes };
};

const GetLandingtime = (duration, departature_time) => {
  let minutes = departature_time.minutes + duration.minutes;
  let hours = departature_time.hours + duration.hours;
  if (minutes >= 60) {
    minutes = parseInt(minutes % 60);
    let hours = departature_time.hours + duration.hours + 1;
  }
  if (hours >= 24) {
    hours = hours % 24;
  }
  return { hours, minutes };
};

//x,y are current departure, destination is destination
const randomFlightInfo = (x, y, destination, days) => {
  const flightNumber = randomFlightNumber();
  const flightModel = randomFlightModel();
  var rawdata = fs.readFileSync("./mock/airports.json");
  let response = JSON.parse(rawdata);
  const dest = response.filter(airport => airport.code == destination);
  const lat = dest[0].latitude;
  const lng = dest[0].longitude;
  let distance = GetDistance(x, y, lat, lng);
  let cost = 0;
  if (distance <= 1000) {
    cost = distance * (0.6 + Math.random() * 0.5);
  } else if (distance > 1000 && distance < 6000) {
    cost = distance * (1 + Math.random() * 0.8) + 100;
  } else {
    cost = distance * (1 + Math.random() * 0.8) + 500;
  }
  let duration = (distance / 560 + 0.2) * 0.6;
  const hours = parseInt(duration);
  const minutes = parseInt(duration * 100 - hours * 60);
  duration = { hours, minutes };
  departature_time = GetDeparturetime();
  arrival_time = GetLandingtime(duration, departature_time);
  distance = distance.toFixed(2);
  cost = cost.toFixed(2);
  // let hotel_price = days * (50 + Math.random() * 175);
  // hotel = hotel.toFixed(2);
  const flightData = {
    flightNumber,
    flightModel,
    distance,
    cost,
    duration,
    departature_time,
    arrival_time
  };
  return flightData;
};

const main_flights = (x, y, airport, days) => {
  const flights = [];
  for (var i = 1; i <= 10; i++) {
    const flight = randomFlightInfo(29.7, -95, "DFW");
    flights.push(flight);
  }
  return flights;
};

module.exports = {
  main_flights
};
