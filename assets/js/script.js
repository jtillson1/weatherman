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
         if (response.ok) {
             response.json().then(function(data) {
                displayWeather(data , cityName);
             });
        }  else {
            alert("Uh Oh: " + response.statusText);
        }
     });
 };

//display the data for the current weather (top right section)
 var displayWeather = function(info, cityName) {
    //clear current city
    cityDataContainer.textContent = "";
    input.value = "";
    //city heading
    var cityHeadingEl = document.createElement("h3");
    cityHeadingEl.textContent = cityName + " (" + date + ") ";
  
    cityDataContainer.appendChild(cityHeadingEl);

    //current weather icon
    var currentImg = document.createElement("img");
    var imgUrl = "https://openweathermap.org/img/wn/" + info.weather[0].icon + ".png";
    currentImg.setAttribute("src", imgUrl);
    cityHeadingEl.appendChild(currentImg);

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
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=263c76e2bd90911c40bad2b37dc3d48c&lat=" + info.coord.lat + "&lon=" + info.coord.lon;

    fetch(uvUrl).then(function(response) {
        response.json().then(function(data) {
            UV(data);
        });
    });

    var UV = function (info) {
        var displayUV = document.createElement("h6");
        displayUV.textContent = "UV Index: " + info.value;

        cityDataContainer.appendChild(displayUV);
        //color code based on value returned
        if (info.value <= 3) {
            displayUV.classList.add("text-success");
        } 
        else if ((info.value > 3) && (info.value < 8)) {
            displayUV.classList.add("text-warning");
        }
        else if (info.value >= 9) {
            displayUV.classList.add("text-danger");
        };
    };
 };
//end of current weather container 

//begin forecast 
 var getForecast = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=263c76e2bd90911c40bad2b37dc3d48c&units=imperial";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
               displayForecast(data , cityName);
            });
        }
    });
 };

var displayForecast = function(info) {
    var firstDay = (currentDate.getMonth()+1)+'/'+(currentDate.getDate()+1)+'/'+currentDate.getFullYear();
    var secondDay = (currentDate.getMonth()+1)+'/'+(currentDate.getDate()+2)+'/'+currentDate.getFullYear();
    var thirdDay = (currentDate.getMonth()+1)+'/'+(currentDate.getDate()+3)+'/'+currentDate.getFullYear();
    var fourthDay = (currentDate.getMonth()+1)+'/'+(currentDate.getDate()+4)+'/'+currentDate.getFullYear();
    var fifthDay = (currentDate.getMonth()+1)+'/'+(currentDate.getDate()+5)+'/'+currentDate.getFullYear();

    var dataArr = [
        {
            day: firstDay,
            icon: info.list[4].weather[0].icon,
            temp: info.list[4].main.temp,
            hum: info.list[4].main.humidity
        },
        {
            day: secondDay,
            icon: info.list[12].weather[0].icon,
            temp: info.list[12].main.temp,
            hum: info.list[12].main.humidity
        },
        {
            day: thirdDay,
            icon: info.list[20].weather[0].icon,
            temp: info.list[20].main.temp,
            hum: info.list[20].main.humidity
        },
        {
            day: fourthDay,
            icon: info.list[28].weather[0].icon,
            temp: info.list[28].main.temp,
            hum: info.list[28].main.humidity
        },
        {
            day: fifthDay,
            icon: info.list[36].weather[0].icon,
            temp: info.list[36].main.temp,
            hum: info.list[36].main.humidity
        }
    ];
    //remove everything before adding new forecast cards
    forecastContainer.textContent = "";
    forecastHeading.textContent = "";

     //create forecast heading
  var forecastTitle = document.createElement("h3");
  forecastTitle.textContent = "5-Day Forecast:";

  forecastContainer.appendChild(forecastTitle);

    //loop for forecast cards

    for (i = 0; i < dataArr.length; i++) {
        //create forecast card 
        var cardEl = document.createElement("div");
        cardEl.classList.add("card", "text-light", "bg-primary", "m-1", );

        //create card info 
        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList.add("card-body", "p-2");

        var cardTitleEl = document.createElement("h5");
        cardTitleEl.textContent = dataArr[i].day;

        cardBodyEl.appendChild(cardTitleEl);

        //icon img 
        var cardIconEl = document.createElement("img");
        var iconUrl = "https://openweathermap.org/img/wn/" + dataArr[i].icon + ".png"
        cardIconEl.setAttribute("src", iconUrl);

        cardBodyEl.appendChild(cardIconEl);

        //create forecadst card temperatures
        var cardTempEl = document.createElement("p");
        cardTempEl.classList.add("card-text");
        cardTempEl.textContent = "Temp: " + dataArr[i].temp + "\u00B0";

        cardBodyEl.appendChild(cardTempEl);

        //create forecast card humidities
        var cardHumidityEl = document.createElement("p");
        cardHumidityEl.classList.add("card-text");
        cardHumidityEl.textContent = "Humidity: " + dataArr[i].hum +"%";
        cardBodyEl.appendChild(cardHumidityEl);

        cardEl.appendChild(cardBodyEl);
        forecastContainer.appendChild(cardEl);
    }
};
//end of forecast 
var getPastSearch = function(city) {
    var oldCityBtn = document.createElement("button");
    oldCityBtn.setAttribute("type", "button");
    oldCityBtn.setAttribute("id", city);
    oldCityBtn.classList.add("btn", "border","btn-light");
    oldCityBtn.textContent = city;

    cityGroup.appendChild(oldCityBtn);

    pastCities.push(city);
    savePastCities();
};

var getPastSearchHandler = function(event) {
    // get button's id and send that to getWeather() and getForecast()
    var citySearch = event.target.getAttribute("id");
    getWeather(citySearch);
    getForecast(citySearch);
};

var savePastCities = function() {
    localStorage.setItem("pastCities", JSON.stringify(pastCities));
};
//get old searched cities to load from local storage and display
var displayPastCities = function() {
    pastCities = localStorage.getItem("pastCities");
    if(pastCities === null) {
        pastCities = [];
        return false;
    }
    pastCities = JSON.parse(pastCities);

    for (var i = 0; i < pastCities.length; i++) {
        var oldCityBtn = document.createElement("button");
        oldCityBtn.setAttribute("type", "button");
        oldCityBtn.setAttribute("id", pastCities[i])
        oldCityBtn.classList.add("btn", "border", "btn-light", "w-100");
        oldCityBtn.textContent = pastCities[i];
        cityGroup.appendChild(oldCityBtn);
    };
};

citySearch.addEventListener("submit", weather);
cityGroup.addEventListener("click", getPastSearchHandler);
displayPastCities();



