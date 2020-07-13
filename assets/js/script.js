var citySearch = document.querySelector("#city-form");
var input = document.querySelector("#city");
var cityDataContainer = document.querySelector("#city-data");
var forecastHeading = document.querySelector("#forecast-heading");
var forecastContainer = document.querySelector("#forecast-days");
var cityGroup = document.querySelector("#city-group");
var currentDate = new Date();
var date = (currentDate.getMonth()+1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
var pastCities = [];

//search button function
var weather = function(event) {
    event.preventDefault();
    var cityName = input.value.trim();

    //check if there is an acceptable input value 
if (cityName) {
    getWeather(cityName);
    getForecast(cityName);
    getPastSearch(cityName);
    citySearch.value = "";
}
else {
    alert("Enter your city correctly");
}
};

//todays weather 
 var getWeather = function(cityName) {
     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=263c76e2bd90911c40bad2b37dc3d48c&units=imperial";

     fetch(apiUrl).then(function(response) {
         if(response.ok) {
             response.json().then(function(data) {
                displayWeather(data , cityName);
             });
             else {
                 alert("Uh Oh: " response.statusText);
             }
         }
     });
 };
 //forecast for the week
 var getForecast = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=263c76e2bd90911c40bad2b37dc3d48c&units=imperial";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
               displayForecast(data , cityName);
            });
            else {
                alert("Uh Oh: " response.statusText);
            }
        }
    });
 };
//display da city heading 
 var displayWeather = function(info, cityName) {
    var cityHeadingEl = document.createElement("h3");
    cityHeadingEl.textContent = cityName + "("+date+")";

    cityDataContainer.appendChild(cityHeadingEl);

    var displayTemperature = document.createElement("h6");
    displayTemperature.textContent = "Temperature: " + info.main.temp + "\u00b0";

    cityDataContainer.appendChild(displayTemperature);
 }
