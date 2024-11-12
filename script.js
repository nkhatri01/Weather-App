var cityValue = document.querySelector(".cityValue");
var tempValue = document.querySelector(".temp");
var desc = document.querySelector(".desc");
var windspeed = document.querySelector(".windspeed");
var weatherGif = document.getElementById("weatherGif");

var apiKey = '4cc40eeb5e68c86e7cce8d9dc0d7abac';

function weatherForm(e) {
  e.preventDefault();
  var word = document.getElementById("cityValue").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${word}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.cod === 200) {  // Check if the city was found
        cityValue.textContent = data.name;
        desc.textContent = data.weather[0].description;
        windspeed.textContent = `${data.wind.speed} m/s`;
        tempValue.textContent = `${data.main.temp} °C`;
        const iconCode = data.weather[0].icon;

        // Update the date display
        updateDate();

        // Update the icons
        weatherInfoDivHourly.innerHTML = ` <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="weather icon" width="70px" height="70px" >`
        // Show appropriate weather GIF, pass sunrise and sunset from API data
        updateWeatherGif(data.weather[0].main, data.sys.sunrise, data.sys.sunset);

        // Flip the card to show the weather details
        flipCard();
      } else {
        alert("City not found. Please enter a valid city name.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the weather data. Please try again.");
    });
}

// Function to update the date display
function updateDate() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const today = new Date();
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];

  const formattedDate = `${dayName} ${date} <br> ${monthName}`;
  
  // Update the date display
  document.getElementById('dateDisplay').innerHTML = formattedDate;
}


// Function to show GIF based on weather description and time of day
function updateWeatherGif(weather, sunrise, sunset) {
  // Get current time in UTC
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

  // Check if it's day or night
  const isDaytime = currentTime > sunrise && currentTime < sunset;

  // Set the weather GIF based on condition and time of day
  if (weather.toLowerCase() === 'clear') {
    weatherGif.src = isDaytime ? 'sunny-day.gif' : 'night-clear.gif';
  } else if (weather.toLowerCase() === 'clouds') {
    weatherGif.src = isDaytime ? 'cloudy-day.gif' : 'cloudy-day.gif';
  } else if (weather.toLowerCase() === 'rain') {
    weatherGif.src = isDaytime ? 'rainy-day.gif' : 'rainy-night.gif';
  } else if (weather.toLowerCase() === 'thunderstorm') {
    weatherGif.src = isDaytime ? 'stromy-day.gif' : 'stromy-day.gif';
  } else if (weather.toLowerCase() === 'snowy') {
    weatherGif.src = isDaytime ? 'snowy-day.gif' : 'snowy-night.gif';
  }
   else {
    // Default GIF if the weather type is unknown
    weatherGif.src = isDaytime ? 'default.gif' : 'default.gif';
  }
}


// Function to flip the card
function flipCard() {
  const card = document.getElementById('flip-card');
  card.style.transform = 'rotateY(180deg)';
}

// Add event listener to the form element
document.getElementById("weatherForm").addEventListener("submit", weatherForm);
