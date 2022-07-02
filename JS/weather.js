const API_KEY = "ea8ca11a65b712b5c0aea20069d39890";

const sunsetElement = document.getElementById("sunset-time");
const sunriseElement = document.getElementById("sunrise-time");
const windElement = document.getElementById("wind");
const tempElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const mainIconElement = document.getElementById("main-section-icon");
const zoneElement = document.getElementById("zone");
const dailyForcastElement = document.getElementById("days-forecast");
const daysElementArray = [];
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let data = null;
let geoData = null;
async function getWeatherData() {
	navigator.geolocation.getCurrentPosition((success) => {
		getData = success.coords;
	});
	for (let index = 0; index < daysElementArray.length; index++) {
		const element = daysElementArray[index];
		element.remove();
	}
	let res = {};
	if (geoData) {
		res = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${getData.latitude}&lon=${getData.longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`
		);
	} else {
		res = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=35.8240876&lon=10.6247323&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`
		);
	}

	data = await res.json();
	const sunrise = new Date(data?.current?.sunrise).toLocaleTimeString("en");
	sunriseElement.innerText = `${sunrise}`;
	const sunset = new Date(data?.current?.sunset).toLocaleTimeString("en");
	sunsetElement.innerText = `${sunset}`;
	windElement.innerText = `${data.current.wind_speed} km/h`;
	tempElement.innerText = `${data.current.temp} °C`;
	descriptionElement.innerText = `${data.current.weather[0].main}, ${data.current.weather[0].description}`;
	mainIconElement.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
	zoneElement.innerText = data.timezone;
	for (let index = 0; index < 5; index++) {
		const element = data.daily[index];
		const dayCard = document.createElement("div");
		daysElementArray.push(dayCard);
		dayCard.className = "day-card";
		const imgWeather = document.createElement("img");
		imgWeather.src = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;
		imgWeather.className = "bts-icon";
		dayCard.appendChild(imgWeather);
		const h2element = document.createElement("h2");
		h2element.className = "day";
		h2element.innerText = days[new Date(element.dt * 1000).getDay()];
		dayCard.appendChild(h2element);
		const minmax = document.createElement("div");
		minmax.className = "min-max";
		const maxElement = document.createElement("max");
		maxElement.className = "max";
		const maxIcon = document.createElement("div");
		maxIcon.className = "min-max-icon";
		const maxfontIcon = document.createElement("i");
		maxfontIcon.className = "fa-solid fa-sort-up";
		maxIcon.appendChild(maxfontIcon);
		const maxP = document.createElement("p");
		maxP.innerText = `${Math.floor(element.temp.max)}°C`;
		maxElement.appendChild(maxIcon);
		maxElement.appendChild(maxP);

		const minElement = document.createElement("min");
		minElement.className = "min";
		const minIcon = document.createElement("div");
		minIcon.className = "min-max-icon";
		const minfontIcon = document.createElement("i");
		minfontIcon.className = "fa-solid fa-sort-down";
		minIcon.appendChild(minfontIcon);
		const minP = document.createElement("p");
		minP.innerText = `${Math.floor(element.temp.min)}°C`;

		minElement.appendChild(minIcon);
		minElement.appendChild(minP);

		minmax.appendChild(maxElement);
		minmax.appendChild(minElement);
		dayCard.appendChild(minmax);
		dailyForcastElement.appendChild(dayCard);
	}
}

document.addEventListener("load", () => {
	getWeatherData();
});
