document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "input your api"; // replace with your actual API key
    const searchBtn = document.getElementById("searchBtn");
    const locationBtn = document.getElementById("locationBtn");
    const cityInput = document.getElementById("city_input");
    
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value;
        if (city) fetchWeatherData(city);
    });

    locationBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(null, latitude, longitude);
            });
        }
    });

    function fetchWeatherData(city, lat = null, lon = null) {
        let weatherUrl = city 
            ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                updateCurrentWeather(data);
                fetchForecastData(data.coord.lat, data.coord.lon);
                fetchAirQualityData(data.coord.lat, data.coord.lon, data.timezone);
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }

    function fetchForecastData(lat, lon) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => updateForecast(data.list))
            .catch(error => console.error("Error fetching forecast data:", error));
    }

    function fetchAirQualityData(lat, lon, timezone) {
        const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetch(airQualityUrl)
            .then(response => response.json())
            .then(data => {
                if (data.list && data.list.length > 0) {
                    updateAirQuality(data.list[0].components);
                } else {
                    console.error("No air quality data available");
                }
            })
            .catch(error => console.error("Error fetching air quality data:", error));
    }

    function updateCurrentWeather(data) {
        document.querySelector(".current-weather h2").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".current-weather p:last-child").innerText = data.weather[0].description;
        document.querySelector(".weather-icon img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector(".card-footer p:first-child").innerText = `📅 ${moment.unix(data.dt).format("dddd, MMM D")}`;
        document.querySelector(".card-footer p:last-child").innerText = `📍 ${data.name}, ${data.sys.country}`;
        document.getElementById("humidityVal").innerText = `${data.main.humidity}%`;
        document.getElementById("pressureVal").innerText = `${data.main.pressure} hPa`;
        document.getElementById("visibilityVal").innerText = `${(data.visibility / 1000).toFixed(1)} km`;
        document.getElementById("windSpeedVal").innerText = `${data.wind.speed} m/s`;
        document.getElementById("feelsVal").innerText = `${Math.round(data.main.feels_like)}°C`;
        document.querySelector(".sunrise-sunset .item:first-child h2").innerText = moment.unix(data.sys.sunrise).utcOffset(data.timezone / 60).format("hh:mm A");
        document.querySelectorAll(".sunrise-sunset .item:last-child h2").innerText = moment.unix(data.sys.sunset).utcOffset(data.timezone / 60).format("hh:mm A");
    }

    function updateForecast(forecastList) {
        const dailyForecasts = forecastList.filter(item => item.dt_txt.includes("12:00:00"));
        const forecastContainer = document.querySelector(".day-forecast");
        forecastContainer.innerHTML = "";
        dailyForecasts.slice(0, 5).forEach(day => {
            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = `
                <div class="icon-wrapper">
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="">
                    <span>${Math.round(day.main.temp)}°C</span>
                </div>
                <p>${moment.unix(day.dt).format("ddd, MMM D")}</p>
                <p>${day.weather[0].description}</p>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    }

    function updateAirQuality(airData) {
        document.querySelectorAll(".air-indices .item:nth-child(1) h2").innerText = airData.pm2_5 ;
        document.querySelector(".air-indices .item:nth-child(2) h2").innerText = airData.pm10;
        document.querySelector(".air-indices .item:nth-child(3) h2").innerText = airData.so2 ;
        document.querySelector(".air-indices .item:nth-child(4) h2").innerText = airData.co ;
        document.querySelector(".air-indices .item:nth-child(5) h2").innerText = airData.nh3 ;
        document.querySelector(".air-indices .item:nth-child(6) h2").innerText = airData.o3 ;
    }
});

