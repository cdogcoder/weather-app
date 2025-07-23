import "./styles.css";

async function fetchWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=3WRZYRZDUK273XPGNXVAZGD5Y&contentType=json`, {mode: "cors"});
    const json = await response.json();
    console.log(json)
    return json;
}