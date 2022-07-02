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
  id: 'streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

//add streets to map
// streets.addTo(map);

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  "SatelliteStreets": satellite
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satellite]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/laurlen2112/Mapping_Earthquakes/main/torontoNeighborhoods.json";

//create myStyle
let myStyle = {
  color: "blue",
  weight: 1
}

// get geo json
d3.json(torontoHoods).then(function(data){
  console.log(data);
  //create geojson layer w/data
styled = L.geoJSON(data, {
  color: "blue",
  weight: 1,
});

styled.addTo(map);