const lat = '51.672'
const lon = '39.1843'

const URLyandex = `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&extra=false&limit=1&hours=false`
const XYandexAPIKey = '476f09f3-014c-40f2-96f4-692d5e33c07e'
const weather = {
    city: '',
    time:'',
    params: {
        temp: '',
        feels_like: '',
        wind_speed: '',
        wind_dir: '',
        pressure_mm:'',
        humidity:'',

        setParams(d) {
            for (obj_key in weather.params) {
                for (response_key in d.fact) {
                    if (obj_key === response_key) {
                        weather.params[obj_key] = d.fact[response_key]
                    }
                }
            }
        },
    },
    setCityAndTime(d) {
        this.city = d.geo_object.locality.name
        this.time = new Date().toLocaleTimeString()
    }

}

const btn = document.getElementById('btn1')

const getWeatherFetch = ()=>{
    fetch(URLyandex,{
        headers: {
            'X-Yandex-API-Key': XYandexAPIKey
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((d) => {
        weather.params.setParams(d)
        weather.setCityAndTime(d)
        document.querySelector('.wrapper__temperature').innerHTML = generateTemplateTemperature()
        document.querySelector('.wrapper__adjust').innerHTML = generateTemplateAdjust()

        console.log(weather)

    });
}
const generateTemplateTemperature = ()=>{
    return`
        <div class="col-6">
            <p class="city">${weather.city}</p>
            <h1 class="temperature">${weather.params.temp}°C</h1>
            <p class="like-temperature">
                <span class="like-temperature_text">Ощущается </span> ${weather.params.feels_like}°C
            </p>
             <div class="wrapper__time" style="font-size: 12px">
                <span class="time-update">${weather.time}</span>
             </div>
        </div>       
    `
}
const generateTemplateAdjust =()=>{
    return`
        <div class="d-flex flex-row align-items-center">
            <img src="../assets/images/wind.png" alt="wind" class="icon-param">
            <p class="wind mb-0 ms-1"> ${(weather.params.wind_dir).toUpperCase()}, ${weather.params.wind_speed}м/с</p>
        </div>
        <div class="d-flex flex-row align-items-center">
            <img src="../assets/images/gauge.png" alt="pressure" class="icon-param">
            <p class="pressure mb-0 ms-1"> ${weather.params.pressure_mm} мм рт. ст.</p>
        </div>
        <div class="d-flex flex-row align-items-center">
            <img src="../assets/images/humidity.png" alt="humidity" class="icon-param">
            <p class="humidity mb-0 ms-1"> ${weather.params.humidity}%</p>
        </div> 
    `
}



btn.addEventListener('click',function(event){
    getWeatherFetch()
})
