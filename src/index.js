import "./styles.css";

let unit = "metric";
let symbol = "°C";
const baseLocation = "Victoriaville";
let input = document.getElementById("location");
let temperature = document.getElementById("temperature");
const search = document.getElementById("search");
const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");


async function getWeather() {
    let location = input.value || baseLocation;
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=NETUREKWQWATN9U8C9CP4593N`;

    try {
        const response = await fetch(url);

        const data = await response.json();

        const temperatureValue = data?.currentConditions?.temp;
        if (temperatureValue !== undefined) {
            let temperatureRound = Math.round(temperatureValue);
            temperature.innerHTML = temperatureRound + symbol;
            updateTemperatureClass(temperatureRound);
        } else {
            alert("Temperature data not available");
        }
    } catch (error) {
        alert("Failed to fetch data. Check console for details.");
    }

}

function updateTemperatureClass(temp) {
    // Supprime toutes les classes de température existantes
    document.body.classList.remove("very-cold", "cold", "fresh", "hot");

    // Ajoute la classe appropriée en fonction de la température
    if (temp > 20) {
        document.body.classList.add("hot");
    } else if (temp > 10) {
        document.body.classList.add("fresh");
    } else if (temp > 0) {
        document.body.classList.add("cold");
    } else {
        document.body.classList.add("very-cold");
    }
}

// Event Listeners
search.addEventListener("click", function (event) {
    event.preventDefault();
    getWeather();
});

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        getWeather();
    }
});

celsius.addEventListener("click", function () {
    unit = "metric";
    symbol = "°C";
    getWeather();
});

fahrenheit.addEventListener("click", function () {
    unit = "us";
    symbol = "°F";
    getWeather();
});

// Initial Fetch
getWeather();
