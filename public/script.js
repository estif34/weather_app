const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

document.addEventListener("keyup", event => {
    if(event.key === '/' && !event.target.matches('input, textarea')){
        event.preventDefault();

        cityInput.focus();
    }
});

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const response = await fetch(`/weather?city=${city}`);
            if (!response.ok){
                throw new Error("City not found");
            }
            const weatherData = await response.json();
            displayWeatherInfo(weatherData);
        }catch(error){
            displayError(error.message);
        }
    }
    else{
        displayError("Please enter a city.");
    }
});

function displayWeatherInfo(data){
    const {name: city,
        sys: {country},
        main: {temp, humidity},
        weather: [{ description, id }]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = `${city}, ${country}`;
    tempDisplay.textContent = `${(temp - 273).toFixed(1)}°C`;
    humidityDisplay.textContent =  `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay')
    tempDisplay.classList.add('tempDisplay')
    humidityDisplay.classList.add('humidityDisplay')
    descDisplay.classList.add('descDisplay')
    weatherEmoji.classList.add('weatherEmoji')

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    let emoji;
    switch(true){
        case weatherId >= 200 && weatherId < 300:
            emoji = "⛈️";
            break;
        case weatherId >= 300 && weatherId < 500:
            emoji = "☔";
            break;
        case weatherId >= 500 && weatherId < 600:
            emoji = "🌧️";
            break;
        case weatherId >= 600 && weatherId < 700:
            emoji = "❄️";
            break;
        case weatherId >= 700 && weatherId < 800:
            emoji = "🌫️";
            break;
        case weatherId === 800:
            emoji = "☀️";
            break;
        case weatherId >= 800 && weatherId < 810:
            emoji = "☁️";
            break;
        default:
            emoji = "❓";
    }
    return emoji;
}

function displayError(message){
    card.textContent = "";
    card.style.display = "flex";
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');
    card.appendChild(errorDisplay);
}