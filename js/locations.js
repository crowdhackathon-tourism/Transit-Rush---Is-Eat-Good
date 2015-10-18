var infowindow;
var marker = null;
var map = null;
var position = { lat: 38, lng: 23.7 };
var zoom = 12;
var contentString;
var google;
var distance;
var GeoMarker;
var time;

var address = "Δεμιρδεσίου 89, Νέα Ιωνία, 14233";

function initMap() {
    'use strict';

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15
    });


    var styles = [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "color": "#d1d5d5" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#1b3765" }, { "weight": "5.60" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#5790e9" }, { "visibility": "on" }] }]


    map.setOptions({ styles: styles });



    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({ fillColor: '#808080' });

    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function () {
        map.setCenter(this.getPosition());
        map.fitBounds(this.getBounds());
    });

    google.maps.event.addListener(GeoMarker, 'geolocation_error', function (e) {
        alert('There was an error obtaining your position. Message: ' + e.message);
    });

    GeoMarker.setMap(map);


    //if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(function (position) {
    //        var pos = {
    //            lat: position.coords.latitude,
    //            lng: position.coords.longitude
    //        };
    //        map.setCenter(pos);
    //        marker(position.coords.latitude, position.coords.longitude);
    //    }, function () {

    //    });
    //} else {
    //}


    function marker(x, y) {
        var marker = new google.maps.Marker({
            position: { lat: x, lng: y },
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Your Location!!!'
        });
    }


    //map = new google.maps.Map(document.getElementById('map'), {
    //    zoom: zoom,
    //    center: position
    //});
}


function gotomap(x, y, name, content) {

    position = { lat: x, lng: y };
    if (marker !== null) {
        marker.setMap(null);
       
    }
    marker = new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        title: name
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    infowindow = new google.maps.InfoWindow({
        content: content
    });
    map.setZoom(13);



    infowindow.open(map, marker);

    if (GeoMarker != null) {

        var z = GeoMarker.getPosition();
        if (z != null) {
            var lat = z.lat();
            var lon = z.lng()

            var latLngA = new google.maps.LatLng(lat, lon);
            var latLngB = new google.maps.LatLng(x,y);
            distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);

            distance = (distance / 1000).toFixed(2);
            time = (distance / 30).toFixed(2);


            $("#distance").text(distance);
            $("#time").text(time);
        }
    }

}

$(window).resize(function () {
    var h = $(window).height();
    $('#map').css('height', (h));
}).resize();