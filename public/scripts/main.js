
window.addEventListener('load', (event) => {
    getLocation();
  });

const x = document.getElementById("error");
const lat = document.getElementById("lat");
const lng = document.getElementById("lng");
const cityName = document.getElementById("cityName");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
   //Create query for the API.
      var latitude = "latitude=" + position.coords.latitude;
      var longitude = "&longitude=" + position.coords.longitude;
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      var query = latitude + longitude + "&localityLanguage=en";

      const Http = new XMLHttpRequest();

      var bigdatacloud_api =
        "https://api.bigdatacloud.net/data/reverse-geocode-client?";

      bigdatacloud_api += query;

      Http.open("GET", bigdatacloud_api);
      Http.send();

      Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          // console.log(myObj);
          cityName.value = myObj.city;
        }
      }
}