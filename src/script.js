import "./styles.css";

async function fetchWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=3WRZYRZDUK273XPGNXVAZGD5Y&contentType=json`, {mode: "cors"});
    if (!response.ok) {
        alert("The input was ass. Try again.");
        return {}
    }
    else {
        const json = await response.json();
        return json;
    }
}

async function extractWeatherData(json) {
    const awaitedJson = await json;
    if (Object.keys(awaitedJson) != 0) {
        const location = awaitedJson.address.split(" ").map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
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

displayWeatherData(extractWeatherData(fetchWeatherData("djsakfljdsa;lkfs")))