import "./styles.css";

async function fetchWeatherData(location) {
    const loadingIndicator = document.querySelector(".loading-indicator");
    loadingIndicator.textContent = "Fetching..."
    const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=3WRZYRZDUK273XPGNXVAZGD5Y&contentType=json`, {mode: "cors"});  
    if (!weatherResponse.ok) {
        loadingIndicator.textContent = "";
        alert("The input was ass. Try again.");
        return {};
    }
    else {
        loadingIndicator.textContent = "";
        const json = await weatherResponse.json();
        const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=DvyYfLs73SKPWnwdGe7smJNL9xUFvqTe&s=${json.currentConditions.conditions}`, {mode: "cors"});
        if (gifResponse.ok) {
            const gif = await gifResponse.json();
            const weatherGif = document.querySelector(".weather-gif");
            weatherGif.src = gif.data.images.original.url;
        }
        return json;
    }
}

async function extractWeatherData(json) {
    const awaitedJson = await json;
    if (Object.keys(awaitedJson) != 0) {
        const location = awaitedJson.resolvedAddress;
        const currTemperature = awaitedJson.currentConditions.temp + "F";
        const currConditions = awaitedJson.currentConditions.conditions;
        const tempHigh = "H: " + awaitedJson.days[0].tempmax + "F";
        const tempLow = "L: " + awaitedJson.days[0].tempmin + "F";
        const oneHourLaterConditions = awaitedJson.days[0].hours[7].conditions;
        const twoHourLaterConditions = awaitedJson.days[0].hours[8].conditions;
        const threeHourLaterConditions = awaitedJson.days[0].hours[9].conditions;
        return [location, currTemperature, currConditions, tempHigh, tempLow, oneHourLaterConditions, twoHourLaterConditions, threeHourLaterConditions]
    }   
    return []
}
    


async function displayWeatherData(arr) {
    const awaitedData = await arr;
    if (awaitedData.length != 0) {
        const weatherInformationElements = document.querySelectorAll(".dom");
        for (let i = 0; i < weatherInformationElements.length; i++) {
            weatherInformationElements[i].textContent = awaitedData[i]
        }
    }
}


const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () => {
    const searchBarValue = searchBar.value;
    if (searchBarValue != 0) {
        displayWeatherData(extractWeatherData(fetchWeatherData(searchBarValue)));
    } else {
        alert("You haven't typed anything, bozo.")
    }
})