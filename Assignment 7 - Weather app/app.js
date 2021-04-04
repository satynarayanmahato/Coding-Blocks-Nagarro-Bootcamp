// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "9676a41fbee86b4d1f652cdf0461352b",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }) .then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1581939704572-ce6ca7b9431a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYXRoZXIlMjBjbGVhciUyMHNreXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    } else if(weatherType.textContent == "Clouds") {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdGhlciUyMGNsb3VkeXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    } else if(weatherType.textContent == "Rain") {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8d2VhdGhlciUyMHJhaW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    } else if(weatherType.textContent == "Snow") {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1516452151280-5aad8c38ec22?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYXRoZXIlMjBzbm93fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    } else if(weatherType.textContent == "Thunderstorm") {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1561485132-59468cd0b553?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhdGhlciUyMHRodW5kZXJzdG9ybXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    } else if(weatherType.textContent == "Haze") {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1610315311389-f862203172f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8d2VhdGhlciUyMGhhemV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
    }
}

// Date manage
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}