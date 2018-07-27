var attr_osm = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
attr_overpass = 'POI via <a href="https://www.overpass-api.de">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: [attr_osm, attr_overpass].join(', ')
});

var southWest = L.latLng(49.2391208, 0.0878906);
var northEast = L.latLng(51.8900539, 6.3500977);
var mapBox = L.latLngBounds(southWest, northEast);

var map = new L.Map('map', {
    zoom: 9,
    center: [50.6146, 3.0652],
    maxBounds: mapBox,
    minZoom: 9
}).addLayer(osm);

// Icon

var rentalIcon = L.icon({
    iconUrl: 'src/img/rental.png',
    iconSize: [20, 20], // size of the icon
});

var stationIcon = L.icon({
    iconUrl: 'src/img/station.png',
    iconSize: [24.5, 12.25], // size of the icon
});

// Rental Layer
var rental = new L.OverPassLayer({ 
        query: '(node["amenity"="bicycle_rental"]({{bbox}}););out qt;',
        minZoom: 13,
        minZoomIndicatorEnabled: false,
        markerIcon: rentalIcon,
        timeout: 10 * 1000, // Milliseconds
        retryOnTimeout: true,
});

// Station layer
var station = new L.OverPassLayer({ 
    query: '(node["railway"="station"]({{bbox}}););out qt;',
    minZoom: 13,
    minZoomIndicatorEnabled: false,
    markerIcon: stationIcon,
    timeout: 10 * 1000, // Milliseconds
    retryOnTimeout: true,
});


var baseLayers = {
    "Open Street Map": osm,
  };
  var overlays = {
    "VLS": rental,
    "Gares": station
  };

var panelLayers = L.control.layers(baseLayers, overlays);
panelLayers.addTo(map);
