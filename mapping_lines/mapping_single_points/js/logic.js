// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid',).setView([40.7, -94.5], 4);

// 13.4.1: set zoom, San Fran at center
let map = L.map('mapid').setView([37.6213, -122.3790], 5);


//skill drill 13.4.1
//add circle to map
// let marker = L.circleMarker([34.0522, -118.2437],{
//   radius: 300,
//   fillColor: '#ffffa1',
//   color: 'black'
// }).addTo(map); 

//add dark layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});
//add darkStreets to map
streets.addTo(map);

//13.4.3 mapping lines

//add line:
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790]
// ];
// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//   color:'red'
// }).addTo(map);

// //new multi-line
// let newLine = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]
// ];
// // Create a polyline using the line coordinates and make the line red.
// L.polyline(newLine, {
//   color:'yellow'
// }).addTo(map);

//skill drill line
let line = [
  [37.6213, -122.3790],
  [30.1124, -97.40719],
  [43.6777176, -79.62481969999],
  [40.641766, -73.780968]
];

 // Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color:'cyan',
  dashArray: '20, 20',
  opacity: 0.5
}).addTo(map);