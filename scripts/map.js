// map.js
// 37°30'58.9"N 122°16'47.6"W
function initMap() {
    document.getElementById("Map").style.display = "block";

    var map = L.map("map").setView([0, 0], 2); 

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var userLocation = [position.coords.latitude, position.coords.longitude];

                map.setView(userLocation, 10); 
                L.marker(userLocation).addTo(map)
                    .bindPopup("Your Location").openPopup();
            },
            function (error) {
                console.error("Error getting user location:", error.message);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }

    var locations = [
        { name: "Boy Scouts Cabin", coordinates: [37.2321, -122.0448] },
        { name: "Agnews Asylum", coordinates: [37.4097, -121.9310] },
        { name: "Train Tunnel", coordinates: [37.1378, -121.9485] },
    ];

    locations.forEach(function (location) {
        var marker = L.marker(location.coordinates).addTo(map)
            .bindPopup(location.name);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('nav ul li:nth-child(2) a').addEventListener('click', initMap);
});
