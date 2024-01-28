const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = "J6NPUFPGBPAXDLBUK8EAPZHKP";

const main = document.querySelector("main");
const footer = document.querySelector("footer");
const landingPage = document.getElementById("landing_page");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search_btn");
const landingText = document.getElementById("landing_text");
const loadingAnim = document.getElementById("loading_animation");
const placeName = document.getElementById("location_name");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const ppt = document.getElementById("precp");
const moisture = document.getElementById("moisture");
const cloudiness = document.getElementById("cloudiness");
const mainTemp = document.getElementById("temp_1");
const secondTemp = document.getElementById("temp_2");
const t1 = document.getElementById("temp_12_am");
const t2 = document.getElementById("temp_1_am");
const t3 = document.getElementById("temp_3_am");
const t4 = document.getElementById("temp_5_am");
const t5 = document.getElementById("temp_7_am");
const t6 = document.getElementById("temp_9_am");
const t7 = document.getElementById("temp_11_am");
const t8 = document.getElementById("temp_1_pm");
const t9 = document.getElementById("temp_3_pm");
const t10 = document.getElementById("temp_5_pm");
const t11 = document.getElementById("temp_7_pm");
const t12 = document.getElementById("temp_9_pm");
const t13 = document.getElementById("temp_11_pm");
const reloadBtn = document.getElementById("reload");

reloadBtn.addEventListener("click", () => {searchWeather});

searchBtn.addEventListener("click", searchWeather);

function searchWeather() {
    let query = search.value.toString();
    if (query.length <= 0) {
        // if the search bar is empty and the user click the search button then show this message
        search.placeholder = "Please search something";
        landingText.innerHTML = "Please search a city or country";

    } else {
        // fetch data from api and display it on the screen;
        search.placeholder = "Search...";
        displayLoadingHideText();
        main.style.display = 'none'; // hide the main when new search is made
        footer.style.display = 'none';
        let queryUrl = API_URL + query + "?key=" + API_KEY;
        fetchWeatherData(queryUrl);
    }
}

search.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault;
        searchWeather();
    }
})


function fetchWeatherData(queryUrl) {
    fetch(queryUrl)
        .then(response => {
            if (response.ok) {
                landingText.innerHTML = "To see weather of your location please search it in the search bar at top right corner.";
                hideTextAndLoading(); // when the response if ok hide the landing page section and display main
                main.style.display = "block";
                footer.style.display = "flex";
                return response.json();

            } else if (response.status === 400) {
                displayTextHideLoading();
                throw new Error("Something is wrong with your search. Enter a valid place.");
            }
        }).then(data => {

            console.log(data);
            placeName.innerHTML = data.address.toString().toUpperCase();

            sunrise.innerHTML = `Sunrise: ${data.days[0].sunrise} AM`;
            sunset.innerHTML = `Sunset: ${data.days[0].sunset} PM`;

            ppt.innerHTML = `Precipitation: ${data.days[0].precipprob}%`;

            moisture.innerHTML = `Moisture: ${data.days[0].humidity}%`;
            cloudiness.innerHTML = `Cloudiness: ${data.days[0].conditions}`;
            mainTemp.innerHTML = convertFerenheitIntoCelsius(data.days[0].temp);
            secondTemp.innerHTML = `Feels like ${convertFerenheitIntoCelsius(data.days[0].feelslike)}&#8451;`;

            //setting temperature at different time
            t1.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[0].temp)}&#8451;`;
           t2.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[2].temp)}&#8451;`;
            t3.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[4].temp)}&#8451;`;
            t4.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[6].temp)}&#8451;`;
            t5.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[8].temp)}&#8451;`;
            t6.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[10].temp)}&#8451;`;
            t7.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[12].temp)}&#8451;`;
            t8.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[14].temp)}&#8451;`;
            t9.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[16].temp)}&#8451;`;
            t10.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[18].temp)}&#8451;`;
            t11.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[19].temp)}&#8451;`;
            t12.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[21].temp)}&#8451;`;
            t13.innerHTML = `${convertFerenheitIntoCelsius(data.days[0].hours[23].temp)}&#8451;`;

        }).catch(error => {
            landingText.innerHTML = error.message;
        })
}

function getTime(milliseconds) {
    const date = new Date(17520569);
    return `${date.getHours}:${date.getMinutes}`;
}

const displayLoadingHideText = () => {
    landingPage.style.display = "flex";
    loadingAnim.style.display = 'block';
    landingText.style.display = 'none';
}
const displayTextHideLoading = () => {
    loadingAnim.style.display = 'none';
    landingText.style.display = 'block';
}

const hideTextAndLoading = () => {
    landingPage.style.display = 'none';
    loadingAnim.style.display = 'none';
    landingText.style.display = 'none';
}


function convertFerenheitIntoCelsius(value) {
    return Math.floor(((value - 32) * 5) / 9);
}

