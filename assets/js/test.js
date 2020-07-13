var search = document.querySelector("#user-form");
var cityInput = document.querySelector("#city");
var cityInfoContainer = document.querySelector("#city-data");
var fiveDayContainer = document.querySelector("#five-day");
var fiveDayHeading = document.querySelector("#five-day-heading");
var cardDeck = document.querySelector("#cardDeck");
var btnGroup = document.querySelector("#btn-group");
var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
var prevSearches = [];

// function when button is clicked
var weatherSearch = function(event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();
    
    // check if the name is good
    if (cityName) {
        getWeatherData(cityName);
        get5Day(cityName);
        previousSearchBtn(cityName);
        search.value = "";
    } else {
        alert("Please enetr an actual city name");
    }
};

// function to call CURRENT weather info for the submitted cityName
var getWeatherData = function(cityName) {
    // format the openWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=67b88f2f59e65e9ba6289a668ea0e4b1&units=imperial";

    // make the request
    fetch(apiUrl).then(function(response) {
        // if the request was ok, send the info to displayWeatherData, if not display an error
        if (response.ok) {
        response.json().then(function(data) {
            displayWeatherData(data, cityName);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// function to call 5-DAY FORECAST for the submitted cityName
var get5Day = function(cityName) {
    // format the openweather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=67b88f2f59e65e9ba6289a668ea0e4b1&units=imperial";

    // make the request
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                display5Day(data, cityName);
                });
        } else {
                alert("Error: " + response.statusText);
        }
    });
};

// function to display weather information to the page
var displayWeatherData = function(info, cityName) {

    cityInfoContainer.classList.add("border");

    // clear the search area
    cityInfoContainer.textContent = "";
    cityInput.value = "";

    // create cityName Heading
    var nameTitle = document.createElement("h4");
    nameTitle.textContent = cityName + " (" + date + ") ";
    cityInfoContainer.appendChild(nameTitle);

        // create span to hold icon of weather and add it on
        var imgSpan = document.createElement("img");
        var iconUrl = "https://openweathermap.org/img/wn/" + info.weather[0].icon + ".png";
        imgSpan.setAttribute("src", iconUrl);
        nameTitle.appendChild(imgSpan);

    // create and display temperature
    var tempDisplay = document.createElement("h6");
    tempDisplay.textContent = "Temperature: " + info.main.temp + "\u00B0";
    cityInfoContainer.appendChild(tempDisplay);

    // create and display humidity
    var humidityDisplay = document.createElement("h6");
    humidityDisplay.textContent = "Humidity: " + info.main.humidity + "%";
    cityInfoContainer.appendChild(humidityDisplay);

    // create and display windspeed
    var windSpeedDisplay = document.createElement("h6");
    windSpeedDisplay.textContent = "Wind Speed: " + info.wind.speed + " MPH";
    cityInfoContainer.appendChild(windSpeedDisplay);

    // fetch, create, and display uv index
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=67b88f2f59e65e9ba6289a668ea0e4b1&lat=" + info.coord.lat + "&lon=" + info.coord.lon;

    fetch(uvUrl).then(function(response) {
        response.json().then(function(data) {
            displayUv(data);
            });
    });

    var displayUv = function(info) {
        var uvDisplay = document.createElement("h6");
        uvDisplay.textContent = "UV Index: " + info.value;
        cityInfoContainer.appendChild(uvDisplay);

        // apply color to uv index to indicate favorable, moderate, or severe
        if (info.value <= 3) {
            uvDisplay.classList.add("text-success");
        } 
        else if ((info.value > 3) && (info.value < 8)) {
            uvDisplay.classList.add("text-warning");
        }
        else if (info.value >= 9) {
            uvDisplay.classList.add("text-danger");
        };
    };
};

// function to display 5-day forecast information to the page
var display5Day = function(info, cityName) {
    var date1 = (today.getMonth()+1)+'/'+(today.getDate()+1)+'/'+today.getFullYear();
    var date2 = (today.getMonth()+1)+'/'+(today.getDate()+2)+'/'+today.getFullYear();
    var date3 = (today.getMonth()+1)+'/'+(today.getDate()+3)+'/'+today.getFullYear();
    var date4 = (today.getMonth()+1)+'/'+(today.getDate()+4)+'/'+today.getFullYear();
    var date5 = (today.getMonth()+1)+'/'+(today.getDate()+5)+'/'+today.getFullYear();

    // array to hold forecast information from openWeather API
    var dataArray = [
        {
            day: date1,
            icon: info.list[4].weather[0].icon,
            temp: info.list[4].main.temp,
            hum: info.list[4].main.humidity
        },
        {
            day: date2,
            icon: info.list[12].weather[0].icon,
            temp: info.list[12].main.temp,
            hum: info.list[12].main.humidity
        },
        {
            day: date3,
            icon: info.list[20].weather[0].icon,
            temp: info.list[20].main.temp,
            hum: info.list[20].main.humidity
        },
        {
            day: date4,
            icon: info.list[28].weather[0].icon,
            temp: info.list[28].main.temp,
            hum: info.list[28].main.humidity
        },
        {
            day: date5,
            icon: info.list[36].weather[0].icon,
            temp: info.list[36].main.temp,
            hum: info.list[36].main.humidity
        }
    ];

    // clear area before adding new cards
    fiveDayContainer.textContent = "";
    fiveDayHeading.textContent = "";

    // create heading
    var fiveDayHead = document.createElement("h4");
    fiveDayHead.textContent = "5-Day Forecast:";
    fiveDayHeading.appendChild(fiveDayHead);

    // loop to create cards and fill with proper info
    for (i = 0; i < dataArray.length; i++) {

        // create card div
        var card = document.createElement("div");
        card.classList.add("card", "text-white", "bg-primary", "m-1");

        // create card-body div
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "p-2");
        
        // create card-title
        var cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = dataArray[i].day;
        cardBody.appendChild(cardTitle);

        // create weather icon img
        var cardIcon = document.createElement("img");
        var iconUrl = "https://openweathermap.org/img/wn/" + dataArray[i].icon + ".png"
        cardIcon.setAttribute("src", iconUrl);
        cardBody.appendChild(cardIcon);

        // create card temperature
        var cardTemp = document.createElement("p");
        cardTemp.classList.add("card-text");
        cardTemp.textContent = "Temp: " + dataArray[i].temp + "\u00B0";
        cardBody.appendChild(cardTemp);

        // create card Humidity
        var cardHum = document.createElement("p");
        cardHum.classList.add("card-text");
        cardHum.textContent = "Humidity: " + dataArray[i].hum + "%";
        cardBody.appendChild(cardHum);

        // add the info to the card and add card to the page
        card.appendChild(cardBody);
        fiveDayContainer.appendChild(card);
    }
};

// function to create previous search buttons
var previousSearchBtn = function(city) {
    //creates a button with the city's name
    var cityBtn = document.createElement("button");
    cityBtn.setAttribute("type", "button");
    cityBtn.setAttribute("id", city)
    cityBtn.classList.add("btn", "border", "btn-light");
    cityBtn.textContent = city;
    btnGroup.appendChild(cityBtn);

    // pushes btn id to prevSearches array and save the array to localStorage
    prevSearches.push(city);
    savePrevSearches();
};

// function to handle previousSearchBtn clicks
var previousSearchBtnHandler = function(event) {
    // get button's id and send that to getWeatherData() and get5Day()
    var citySearch = event.target.getAttribute("id");
    getWeatherData(citySearch);
    get5Day(citySearch);
};

// function to save searches
var savePrevSearches = function() {
    localStorage.setItem("prevSearches", JSON.stringify(prevSearches));
};

// function to load previous searches to page
var loadPrevSearches = function() {
    // get prevSearches from localStorage and convert to array of objects
    prevSearches = localStorage.getItem("prevSearches");
    if (prevSearches === null) {
        prevSearches = [];
        return false;
    }
    prevSearches = JSON.parse(prevSearches);

    // loop through array and create buttons for previous searches
    for (var i = 0; i < prevSearches.length; i++) {
        //creates a button with the city's name
        var cityBtn = document.createElement("button");
        cityBtn.setAttribute("type", "button");
        cityBtn.setAttribute("id", prevSearches[i])
        cityBtn.classList.add("btn", "border", "btn-light");
        cityBtn.textContent = prevSearches[i];
        btnGroup.appendChild(cityBtn);
    };
};

search.addEventListener("submit", weatherSearch);
btnGroup.addEventListener("click", previousSearchBtnHandler);
loadPrevSearches();