//This is used in livemaps.html
var db_url = "https://api.jcdecaux.com/vls/v1/stations?contract=";
var db_API = "30ae8e68ff6ff0175b969c62ee4bd43c4c32bb0f";
var db_contract = "dublin";
var db_xmlhttp = new XMLHttpRequest();
var arr;

    db_xmlhttp.onreadystatechange = function () {
    if (db_xmlhttp.readyState == 4 && db_xmlhttp.status == 200) {
        arr = JSON.parse(db_xmlhttp.responseText);
        initMap(arr);

    }
}

db_xmlhttp.open("GET", db_url + db_contract + "&apiKey=" + db_API, true);

db_xmlhttp.send();


    function initMap(arr) {





            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: {
                    lat: 53.3472403,
                    lng: -6.2592059
                }
            });

            var num_markers = arr.length;
            var infowindow = new google.maps.InfoWindow();
            var marker;
            var colorIcon;
            
            for (var i = 0; i < num_markers; i++) {
                    marker = new google.maps.Marker({
                    position: new google.maps.LatLng(arr[i].position.lat, arr[i].position.lng),
                    icon: {url: trafficLight(i),
                               scaledSize: new google.maps.Size(25, 25), // scaled size
                               origin: new google.maps.Point(0,0), // origin
                               anchor: new google.maps.Point(0, 0) // anchor
                          },
                    map: map,
                    title: arr[i].address
                });
                
                function trafficLight(x) {

                    var freeBikes = arr[i].available_bikes;

                    
                    if (freeBikes < 5) {
                        colorIcon = "images/redmarker.png"
                    }

                    if (freeBikes < 10 && freeBikes >= 5) {
                        colorIcon = "images/ambermarker.png"
                    }

                    if (freeBikes > 10) {
                        colorIcon = "images/greenmarker.png"
                    }
                    return colorIcon;
                }
                
                var contentString = '<p>Station Name: ' + arr[i].address + '<br>' + '</p>'
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent('<p>Station Name: ' + arr[i].address + '<br>' + 
                                              'Available Bikes: ' + arr[i].available_bikes + '<br>' + 
                                              'Available Stands: ' + arr[i].available_bike_stands + '<br>' + 
                                              'Station is currently: ' + arr[i].status + '<br>' + 
                                              'Last Update: ' + moment(arr[i].last_update).format("DD-MM-YYYY HH:mm:ss")     
                                              + '</p>');                       
                        infowindow.open(map, marker);
                    }
                })(marker, i));



            }

    }
