import "./styles.css";

async function fetchWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=3WRZYRZDUK273XPGNXVAZGD5Y&contentType=json`, {mode: "cors"});
    const json = await response.json();
    console.log(json)
    return json;
}

function extractWeatherData(json) {
    const location = json.address;
    const currTemperature = json.currentConditions.temp;
    const currConditions = json.currConditions.conditions;
    const tempHigh = json.days[0].tempmax;
    const tempLow = json.days[0].tempmin;
    const oneHourLaterConditions = json.days[0].hours[7].conditions;
    const twoHourLaterConditions = json.days[0].hours[8].conditions;
    const threeHourLaterConditions = json.days[0].hours[9].conditions;
    return [location, currTemperature, currConditions, tempHigh, tempLow, oneHourLaterConditions, twoHourLaterConditions, threeHourLaterConditions]
}