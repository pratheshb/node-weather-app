const weatherForm = document.querySelector("form");
const address = document.querySelector("input");

const currentLocBtn = document.querySelector('#current-location-btn')

const forecastHeader = document.getElementById("location");
const forecastBody = document.getElementById("forecast");

currentLocBtn.addEventListener('click', () => {
  forecastHeader.innerHTML = "Fetching Data...";
  forecastBody.innerHTML = "Please wait";

  if(!navigator.geolocation) {
    return alert('Your browser doesn\'t support geolocation');
 }

 navigator.geolocation.getCurrentPosition((position) => {
     const {latitude, longitude} = position.coords
     fetch("/weather?latitude=" + latitude+"&longitude="+longitude)
    .then((res) => {
      res.json().then((resJson) => {
        forecastHeader.innerHTML = resJson.location || "";
        forecastBody.innerHTML = resJson.data;
      });
    })
    .catch((err) => {
      forecastHeader.innerHTML = "Sorry";
      forecastBody.innerHTML = "Something went wrong";
    });
 })

  
})

weatherForm.addEventListener("submit", (event) => {

  event.preventDefault();

  forecastHeader.innerHTML = "Fetching Data...";
  forecastBody.innerHTML = "Please wait";

  fetch("/weather?address=" + address.value)
    .then((res) => {
      res.json().then((resJson) => {
        forecastHeader.innerHTML = resJson.location || "";
        forecastBody.innerHTML = resJson.data;
      });
    })
    .catch((err) => {
      forecastHeader.innerHTML = "Sorry";
      forecastBody.innerHTML = "Something went wrong";
    });
});
