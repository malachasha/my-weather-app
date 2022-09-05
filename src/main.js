let apiKey = "54a3a2d6dda5f3e3dff81f647d318319";

let cels = document.querySelector("#celsius");
let fahr = document.querySelector("#fahrenheit");

//the current date and time
let dt = new Date();
let day = document.querySelector("#day");
let date = document.querySelector("#date");
let time = document.querySelector("#time");
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
day.innerHTML = days[dt.getDay()];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

date.innerHTML =
  months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
time.innerHTML =
  (dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours()).toString() +
  ":" +
  ((dt.getMinutes() < 10 ? "0" : "").toString() + dt.getMinutes().toString()) +
  (dt.getHours() < 12 ? " AM" : " PM").toString();

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `<div class="col other-days">
              <div class="card h-100 days-con">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecast[0].weather[0].icon
                  }@2x.png"
                  class="card-img-top other-img"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">
                    <strong>${Math.round(forecast[0].temp.max)}°C</strong>
                    <br />
                    ${Math.round(forecast[0].temp.min)}°C
                  </p>
                  <h5 class="card-title">${forecastDays[dt.getDay() + 1]} ${
      dt.getDate() + 1
    }</h5>
                </div>
              </div>
            </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="col other-days">
              <div class="card h-100 days-con">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecast[1].weather[0].icon
                  }@2x.png"
                  class="card-img-top other-img"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">
                    <strong>${Math.round(forecast[1].temp.max)}°C</strong>
                    <br />
                    ${Math.round(forecast[1].temp.min)}°C
                  </p>
                  <h5 class="card-title">${forecastDays[dt.getDay() + 2]} ${
      dt.getDate() + 2
    }</h5>
                </div>
              </div>
            </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="col other-days">
              <div class="card h-100 days-con">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecast[2].weather[0].icon
                  }@2x.png"
                  class="card-img-top other-img"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">
                    <strong>  ${Math.round(forecast[2].temp.max)}°C</strong>
                    <br />
                      ${Math.round(forecast[2].temp.min)}°C
                  </p>
                  <h5 class="card-title">${forecastDays[dt.getDay() + 3]} ${
      dt.getDate() + 3
    }</h5>
                </div>
              </div>
            </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="col other-days">
              <div class="card h-100 days-con">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecast[3].weather[0].icon
                  }@2x.png"
                  class="card-img-top other-img"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">
                    <strong>${Math.round(forecast[3].temp.max)}°C</strong>
                    <br />
                    ${Math.round(forecast[3].temp.min)}°C
                  </p>
                  <h5 class="card-title">${forecastDays[dt.getDay() + 4]} ${
      dt.getDate() + 4
    }</h5>
                </div>
              </div>
            </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="col other-days">
              <div class="card h-100 days-con">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecast[4].weather[0].icon
                  }@2x.png"
                  class="card-img-top other-img"
                  alt="..."
                />
                <div class="card-body">
                  <p class="card-text">
                    <strong>${Math.round(forecast[4].temp.max)}°C</strong>
                    <br />
                    ${Math.round(forecast[4].temp.min)}°C
                  </p>
                  <h5 class="card-title">${forecastDays[dt.getDay() + 5]} ${
      dt.getDate() + 5
    }</h5>
                </div>
              </div>
            </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let api = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api}&units=metric`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function ShowTemp(response) {
  let city = document.querySelector("#city");
  let windSpeed = document.querySelector(".windspeed");
  let humidity = document.querySelector(".humidity");
  let pressure = document.querySelector(".pressure");
  let cityTemp = document.querySelector("#temperature");
  let weatherStatus = document.querySelector("#weather-status");
  let iconElement = document.querySelector(".current-img");

  celsiusTemp = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  windSpeed.innerHTML = response.data.wind.speed + " Km/h";
  humidity.innerHTML = response.data.main.humidity + " %";
  pressure.innerHTML = response.data.main.pressure + " hPa";
  weatherStatus.innerHTML = response.data.weather[0].description.toUpperCase();
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function displayCity() {
  let input = document.querySelector(".type-city");
  let cityName = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(ShowTemp);
  cels.style.color = "#212529";
  fahr.style.color = "#b0bec5";
}
let btn = document.querySelector("button");

btn.addEventListener("click", displayCity);

//When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

var temperature = document.querySelector("#temperature");

function ShowFahr(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
  cels.style.color = "#b0bec5";
  fahr.style.color = "#212529";
}
function ShowCels(event) {
  event.preventDefault();
  temperature.innerHTML = celsiusTemp;
  cels.style.color = "#212529";
  fahr.style.color = "#b0bec5";
}

//it uses the Geolocation API to get your GPS coordinates and display
//and the city and current temperature using the OpenWeather API.

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(ShowTemp);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
  cels.style.color = "#212529";
  fahr.style.color = "#b0bec5";
}

let celsiusTemp = null;
let locationBtn = document.querySelector(".current-btn");
locationBtn.addEventListener("click", currentCity);
cels.addEventListener("click", ShowCels);
fahr.addEventListener("click", ShowFahr);
