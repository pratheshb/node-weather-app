const weatherForm = document.querySelector("form");
const address = document.querySelector("input");

const forecastHeader = document.getElementById("location");
const forecastBody = document.getElementById("forecast");

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
