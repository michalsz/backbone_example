function loadGoogleMap() {
    var myLatlng = new google.maps.LatLng(52.216582, 21.022339);
    markers = [];
    var mapOptions = {
        center: new google.maps.LatLng(52.216582, 21.022339),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"),
			      mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Hello World!"
    });
};


function putMarker(geo, title){
    var myLatlng = new google.maps.LatLng(geo.coordinates[0], geo.coordinates[1]);
    
    var image = new google.maps.MarkerImage(
        'img/map-icon-twitt.png',
        new google.maps.Size(32,37),
        new google.maps.Point(0,0),
        new google.maps.Point(16,37)
    );
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image,
        title: title
    });

    markers.push(marker);
};

function removeMarkers(){
    if (markers) {
        for (var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
    }
}
