var attr_osm = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
attr_overpass = 'POI via <a href="https://www.overpass-api.de">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: [attr_osm, attr_overpass].join(', ')
});

var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(50.6333, 3.0667), 13);

var opl = new L.OverPassLayer({
    query: '(node["amenity"="bicycle_rental"]({{bbox}}););out qt;',
    minZoom: 11,
    minZoomIndicatorOptions: {
        position: 'topright',
        minZoomMessage: 'Current zoom level: CURRENTZOOM - All data at level: MINZOOMLEVEL'
    },

});
map.addLayer(opl);