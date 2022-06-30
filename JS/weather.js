const locationElement = document.getElementById("location");
const mainSectionIconElement = document.getElementById("main-section-icon");
const temperatureElement = document.getElementById("temperature");
const zoneElement = document.getElementById("zone");
const descriptionElement = document.getElementById("description");
const windIconElement = document.getElementById("wind-icon");
const windElement = document.getElementById("wind");
const sunriseIconElement = document.getElementById("sunrise-icon");
const sunriseTimeElement = document.getElementById("sunrise-time");
const sunsetIconElement = document.getElementById("sunset-icon");
const sunsetTimeElement = document.getElementById("sunset-time");
const firstDayIconElement = document.getElementById("firstDay-icon");
const firstDayWeatherElement = document.getElementById("firstDay-weather");
const firstDayMaxTempElement = document.getElementById("firstDayMax-temperature");
const firstDayMinTempElement = document.getElementById("firstDayMin-temperature");
const secondDayIconElement = document.getElementById("secondDay-icon");
const secondDayWeatherElement = document.getElementById("secondDay-weather");
const secondDayMaxTempElement = document.getElementById("secondDayMax-temperature");
const secondDayMinTempElement = document.getElementById("secondDayMin-temperature");
const thirdDayIconElement = document.getElementById("thirdDay-icon");
const thirdDayWeatherElement = document.getElementById("thirdDay-weather");
const thirdDayMaxTempElement = document.getElementById("thirdDayMax-temperature");
const thirdDayMinTempElement = document.getElementById("thirdDayMin-temperature");
const forthDayIconElement = document.getElementById("forthDay-icon");
const forthDayWeatherElement = document.getElementById("forthDay-weather");
const forthDayMaxTempElement = document.getElementById("forthDayMax-temperature");
const forthDayMinTempElement = document.getElementById("forthDayMin-temperature");
const fifthDayIconElement = document.getElementById("fifthDay-icon");
const fifthDayWeatherElement = document.getElementById("fifthDay-weather");
const fifthDayMaxTempElement = document.getElementById("fifthDayMax-temperature");
const fifthDayMinTempElement = document.getElementById("fifthDayMin-temperature");
const API_KEY = "3a61d03d191e00e1fa908edb1ff5d13c";

  function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data =>{
    console.log(data)
    showWeatherData(data);
    })
  })
}
getWeatherData();

function showWeatherData(data){
  let { sunrise, sunset, wind_speed, temp } = data.current;
  let weatherDesc = data.current.weather[0].description;
  let timezone = data.timezone;
  temperatureElement.innerText=temp;
  zoneElement.innerText=timezone;
  descriptionElement.innerText=weatherDesc;
  windElement.innerText=wind_speed;
  sunriseTimeElement.innerText=sunrise;
  sunsetTimeElement.innerText=sunset;
  firstDayWeatherElement.innerText=data.daily[1].weather[0].main;
  firstDayMaxTempElement.innerText=data.daily[1].temp.max;
  firstDayMinTempElement.innerText=data.daily[1].temp.min;
  secondDayWeatherElement.innerText=data.daily[2].weather[0].main;
  secondDayMaxTempElement.innerText=data.daily[2].temp.max;
  secondDayMinTempElement.innerText=data.daily[2].temp.min;
  thirdDayWeatherElement.innerText=data.daily[3].weather[0].main;
  thirdDayMaxTempElement.innerText=data.daily[3].temp.max;
  thirdDayMinTempElement.innerText=data.daily[3].temp.min;
  forthDayWeatherElement.innerText=data.daily[4].weather[0].main;
  forthDayMaxTempElement.innerText=data.daily[4].temp.max;
  forthDayMinTempElement.innerText=data.daily[4].temp.min;
  fifthDayWeatherElement.innerText=data.daily[5].weather[0].main;
  fifthDayMaxTempElement.innerText=data.daily[5].temp.max;
  fifthDayMinTempElement.innerText=data.daily[5].temp.min;
  var currentWeatherIcon=data.current.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + currentWeatherIcon + ".png";
  console.log(iconurl);
  mainSectionIconElement.src=iconurl;



}


