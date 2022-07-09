// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// deliverable 3 - add a 3rd style to the map
let darkMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});



// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark Style": darkMap
};

// 1. Add a 2nd layer group for the tectonic plate data; Add a 3rd layer group for the major earthquake data..
let allEarthquakes = new L.LayerGroup();

let plates = new L.LayerGroup();

let majQuakes = new L.LayerGroup()

// 2. Add a reference to the tectonic plates group & major earthquakes group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": plates,
  "Major Earthquakes": majQuakes
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
   //change hex codes to mathc to color pallete found on coolors.co

  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#f72585";
    }
    if (magnitude > 4) {
      return "#b5179e";
    }
    if (magnitude > 3) {
      return "#7209b7";
    }
    if (magnitude > 2) {
      return "#3f37c9";
    }
    if (magnitude > 1) {
      return "#4895ef";
    }
    return "#4cc9f0";
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

// 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.

let majQuakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(majQuakeData).then(function(data) {
  console.log(data);

// 4. Use the same style as the earthquake data.
function majQuakeStyle(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getmajQuakeColor(feature.properties.mag),
    color: "#000000",
    radius: getmajQuakeRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}
  

// 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
// This function determines the color of the marker based on the magnitude of the earthquake.
function getmajQuakeColor (magnitude) {
  if (magnitude > 6) {
    return "#c51d6a";
  }
  if (magnitude >= 5) {
    return "#f72585";
  }
  if (magnitude < 5) {
    return "#b5179e";
}
}

// 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
function getmajQuakeRadius(magnitude) {
  if (magnitude < 5) {
    return magnitude * 4;
  }
  if (magnitude > 5){
  return magnitude * 4;
  }
  if (magnitude > 6){
  return magnitude * 4;
  }
}

// 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
// sets the style of the circle, and displays the magnitude and location of the earthquake
//  after the marker has been created and styled.
L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    //set style
    style: majQuakeStyle,
    //add the popups
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  
// // 8. Add the major earthquakes layer to the map.
  }).addTo(majQuakes);

// // 9. Close the braces and parentheses for the major earthquake data.
});

  // Then we add the earthquake layer to our map.
majQuakes.addTo(map);

  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
//change hex codes to mathc to color pallete found on coolors.co
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#4cc9f0",
    "#4895ef",
    "#3f37c9",
    "#7209b7",
    "#b5179e",
    "#f72585"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);


  // // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  let plateData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
  
  d3.json(plateData).then(function(data){
    console.log(data);
    //add to map
    L.geoJSON(data, {
      color: "#fbf8cc",
      weight: 3,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h4>Plate Information:</h4><em>Name</em>: " + feature.properties.Name + "<br><em>Source</em>: " + feature.properties.Source);
       }
      }
    
    ).addTo(plates);
  
plates.addTo(map);
});
});