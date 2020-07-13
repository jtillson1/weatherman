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
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=263c76e2bd90911c40bad2b37dc3d48c&units=imperial";

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
//display the data for the current weather (top right section)
 var displayWeather = function(info, cityName) {
    var cityHeadingEl = document.createElement("h3");
    cityHeadingEl.textContent = cityName + "("+date+")";

    cityDataContainer.appendChild(cityHeadingEl);
//display temp
    var displayTemperatureEl = document.createElement("h6");
    displayTemperatureEl.textContent = "Temperature: " + info.main.temp + "\u00b0";

    cityDataContainer.appendChild(displayTemperatureEl);
    //dispay humidity
    var displayHumidityEl = document.createElement("h6");
    displayHumidityEl.textContent = "Humidity: " + info.main.humidity + "%";
     
    cityDataContainer.appendChild(displayHumidityEl);
    //display windspped
    var displayWindspeedEl = document.createElement("h6");
    displayWindspeedEl.textContent = "Wind Speed: " + info.wind.speed + " mph";

    cityDataContainer.appendChild(displayWindspeedEl);
    //UV index 1.fetch from api 2.create the element 3. display it 
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?q=&appid=263c76e2bd90911c40bad2b37dc3d48c" + info.coord.lat + "&lon=" + info.coord.lon;

    fetch(uvurl).then(function(response) {
        response.json().then(function(data) {
            UV(data);
        });
    });

    var UV = function (info) {
        var displayUV = document.createElement("h6");
        displayUV.textContent = "UV Index: " + info.value;

        cityDataContainer.appendChild(displayUV);
        //color code based on value returned
        if (info.value < = 3) {
            displayUV.classList.add("text-success");
        }else if (info.value > 3) {
            displayUV.classList.add("text-warning");
        }else if (info.value > = 9) {
            displayUV.classList.add("text-danger");
        };
    };
 };
