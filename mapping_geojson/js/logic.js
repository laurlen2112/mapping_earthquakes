// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid',).setView([40.7, -94.5], 4);

// 13.5.3: set zoom
// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

//add tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'nstreets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

//add streets to map
// streets.addTo(map);

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/laurlen2112/mapping_earthquakes/main/majorAirports.json";


// // Grabbing our GeoJSON data.
 d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});

// Grabbing our GeoJSON data.--using the bindpopup
//L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
  // pointToLayer: function(feature, layer) {
  //   console.log(feature);
  //   return L.marker(latlng)
  //   layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name +"</h3>")
  // }

// }).addTo(map);

//using the oneeach method
L.geoJSON(airportData,{
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name +"</h3>");
   }
}).addTo(map);


