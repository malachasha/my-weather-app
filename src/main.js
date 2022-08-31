let apiKey = "54a3a2d6dda5f3e3dff81f647d318319";
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

//display the city name on the page after the user submits the form.
function ShowTemp(response) {
  let city = document.querySelector("#city");
  let windSpeed = document.querySelector(".windspeed");
  let humidity = document.querySelector(".humidity");
  let pressure = document.querySelector(".pressure");
  let cityTemp = document.querySelector("#temperature");
  let weatherStatus = document.querySelector("#weather-status");
  city.innerHTML = response.data.name;
  windSpeed.innerHTML = response.data.wind.speed + " Km/h";
  humidity.innerHTML = response.data.main.humidity + " %";
  pressure.innerHTML = response.data.main.pressure + " hPa";
  weatherStatus.innerHTML = response.data.weather[0].description.toUpperCase();
  cityTemp.innerHTML = Math.round(response.data.main.temp);
}

function displayCity() {
  let input = document.querySelector(".type-city");
  let cityName = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(ShowTemp);
}
let btn = document.querySelector("button");
//In your project, when a user searches for a city (example: New York),
//it should display the name of the city on the result page
//and the current temperature of the city.
btn.addEventListener("click", displayCity);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.
let cels = document.querySelector("#celsius");
let fahr = document.querySelector("#fahrenheit");
var temperature = document.querySelector("#temperature");

function celsToFahr() {
  temperature.innerHTML = "68";
  cels.style.color = "#b0bec5";
  fahr.style.color = "#212529";
}
function fahrToCels() {
  temperature.innerHTML = "20";
  cels.style.color = "#212529";
  fahr.style.color = "#b0bec5";
}
cels.addEventListener("click", fahrToCels);
fahr.addEventListener("click", celsToFahr);

//Add a Current Location button. When clicking on it,
//it uses the Geolocation API to get your GPS coordinates and display
//and the city and current temperature using the OpenWeather API.
function ShowCurrentTemp(response) {
  let cityName = response.data.name;
  let windSpeed = document.querySelector(".windspeed");
  let humidity = document.querySelector(".humidity");
  let weatherStatus = document.querySelector("#weather-status");
  let pressure = document.querySelector(".pressure");
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = cityName;
  windSpeed.innerHTML = response.data.wind.speed + " Km/h";
  humidity.innerHTML = response.data.main.humidity + " %";
  pressure.innerHTML = response.data.main.pressure + " hPa";
  weatherStatus.innerHTML = response.data.weather[0].description.toUpperCase();
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(ShowCurrentTemp);
}

function currentCity() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let locationBtn = document.querySelector(".current-btn");
locationBtn.addEventListener("click", currentCity);
