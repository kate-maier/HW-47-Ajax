// За допомогою ajax-запиту вивести погоду

// http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19

// q=XXX - місто, для якого показати погоду
// temp – температура
// pressure - тиск
// description – опис
// humidity – вологість 
// speed – швидкість вітру
// deg - напрям у градусах
// icon - значок, де 10d код іконки
// http://openweathermap.org/img/w/10d.png

let cityName;
function showWeather() {
    cityName = document.querySelector('input').value;

    if (!/\D/g.test(cityName)) {
        alert('В полі повинні бути тількі літери. Введіть коректну назву міста.');
        return false;
    }
    apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=5d066958a60d315387d9492393935c19&lang=uk`;
    fetchData(apiUrl);
}

function fetchData(url) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let dataContainer = document.getElementById('data-container');
                let temp = data.main.temp;
                let pressure = data.main.pressure;
                let description = data.weather[0].description;
                let humidity = data.main.humidity;
                let speed = data.wind.speed;
                let deg = data.wind.deg;
                let iconID = data.weather[0].icon;
                let iconSrc = `http://openweathermap.org/img/w/${iconID}.png`;

                dataContainer.innerHTML = `Місто: ${cityName}.<br> <img src=${iconSrc} alt="icon"/> <br> ${description}. <br> Температура: ${temp}. <br> 
                Тиск: ${pressure}. <br> Вологість: ${humidity}.<br> Швидкість вітру: ${speed}.<br> Напрям у градусах: ${deg}.`
            } else {
                console.error('Error: ', xhr.status);
            }
        }
    }
    xhr.send();
}
