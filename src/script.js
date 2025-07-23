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
            weatherGif.textContent = "";
            weatherGif.style.backgroundImage = `url(${gif.data.images.original.url})`;
        }
        return json;
    }
}

async function extractWeatherData(json) {
    const awaitedJson = await json;
    if (Object.keys(awaitedJson) != 0) {
        const now = new Date();
        const location = awaitedJson.resolvedAddress;
        const currTemperature = awaitedJson.currentConditions.temp + "F";
        const currConditions = awaitedJson.currentConditions.conditions;
        const tempHigh = "H: " + awaitedJson.days[0].tempmax + "F";
        const tempLow = "L: " + awaitedJson.days[0].tempmin + "F";
        let oneHourLater = now.getHours()+1;
        let twoHoursLater = now.getHours()+2;
        let threeHoursLater = now.getHours()+3;
        const oneHourLaterConditions = awaitedJson.days[0].hours[oneHourLater].conditions;
        const twoHoursLaterConditions = awaitedJson.days[0].hours[twoHoursLater].conditions;
        const threeHoursLaterConditions = awaitedJson.days[0].hours[threeHoursLater].conditions;
        oneHourLater = oneHourLater > 12 ? oneHourLater-12 + "PM" : oneHourLater + "AM";
        twoHoursLater = twoHoursLater > 12 ? twoHoursLater-12 + "PM" : twoHoursLater + "AM";
        threeHoursLater = threeHoursLater > 12 ? threeHoursLater-12 + "PM" : threeHoursLater + "AM";
        return [location, currTemperature, currConditions, tempHigh, tempLow, oneHourLater, oneHourLaterConditions, twoHoursLater, twoHoursLaterConditions, threeHoursLater, threeHoursLaterConditions]
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
        searchBar.value = "";
    } else {
        alert("You haven't typed anything, bozo.")
    }
})