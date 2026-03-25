async function getWeather() {
    const cityName = document.getElementById("cityInput").value;
    const error = document.getElementById("error");
    const forecastDiv = document.getElementById("forecast");
    const cityText = document.getElementById("city");

    error.textContent = "";
    forecastDiv.innerHTML = "";
    cityText.textContent = "";

    if (cityName === "") {
        error.textContent = "Please enter a city name";
        return;
    }

    try {
        
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            error.textContent = "City not found";
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const city = geoData.results[0].name;

        cityText.textContent = city;

        
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=auto`
        );
        const weatherData = await weatherResponse.json();

        const days = weatherData.daily.time;
        const temps = weatherData.daily.temperature_2m_max;

        for (let i = 0; i < 7; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.className = "day";
            dayDiv.textContent = `Day ${i + 1} (${days[i]}) : ${temps[i]} °C`;
            forecastDiv.appendChild(dayDiv);
        }

    } catch (err) {
        error.textContent = "Something went wrong";
    }
}
