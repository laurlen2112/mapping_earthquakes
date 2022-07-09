//add a variable to get cities data
let cityData = cities;

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid',).setView([40.7, -94.5], 4);

//loop through cities to create a marker for each city in arry
cityData.forEach(function(city) {
  console.log(city)
  L.circleMarker(city.location,{
    radius: city.population/100000,
    fillColor: 'orange',
    color: 'orange',
    lineWeight: 4

  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
.addTo(map);
});

//skill drill 13.4.1
//add circle to map
// let city = L.circle[34.0522, -118.2437],{
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
