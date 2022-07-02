// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid',).setView([40.7, -94.5], 4);

// 13.5.1: set zoom, San Fran at center
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.--using the bindpopup
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country +"</h3>")
//   }

// }).addTo(map);

//using the oneeach method
L.geoJSON(sanFranAirport, {
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name +"</h3>");
   }
}).addTo(map);


//add dark layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'navigation-night-v1',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});
//add darkStreets to map
streets.addTo(map);