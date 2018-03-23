//This is used in livemaps.html
var db_url = "https://api.jcdecaux.com/vls/v1/stations?contract=";
var db_API = "30ae8e68ff6ff0175b969c62ee4bd43c4c32bb0f";
var db_contract = "dublin";
var db_xmlhttp = new XMLHttpRequest();
var arr;

    db_xmlhttp.onreadystatechange = function () {
    if (db_xmlhttp.readyState == 4 && db_xmlhttp.status == 200) {
        arr = JSON.parse(db_xmlhttp.responseText);
        basicBikeInfo(arr);
    }
}

db_xmlhttp.open("GET", db_url + db_contract + "&apiKey=" + db_API, true);

db_xmlhttp.send();

function basicBikeInfo(arr){
    var result = "<table>";
    result +=
    "<tr>" +
    "<th>Station</th>" +
    "<th>Available Bikes</th>" +
    "<th>Available Stands</th>" +
    "<th>Station Capacity</th>";
        
   
 for(var i = 0; i < arr.length; i++) {    
    result +=
    "<tr><td>" +
    arr[i].address +
    "</td><td>" +
    arr[i].available_bikes + 
    "</td><td>" +
    arr[i].available_bike_stands+ 
    "</td><td>" +
    (arr[i].available_bikes + arr[i].available_bike_stands) +
    "</td></tr>" 
        
 }
    result += "</table>";
    document.getElementById("stat").innerHTML = result;
}   

       