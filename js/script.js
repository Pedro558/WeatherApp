import { cityElem, iconElem, descElem, tempElem, humidityElem, windElem, weatherElem, bodyElem} from "./elements.js"

let searchWeather = {
  apiKey: "69aa8e0da4a62bfeac16a488398c391f",
  fetchWeather: function(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
    .then((response) => response.json())
    .then((data) => this.displayWeather(data))
  },
  displayWeather: function(data){
    const { name } = data
    const { description, icon } = data.weather[0]
    const { temp, humidity } = data.main
    const { speed } = data.wind
    
    console.log(name, icon, description, temp, humidity, speed);

    
    cityElem.innerText = `Weather in ${name}`
    iconElem.src = `https://openweathermap.org/img/wn/${icon}.png`
    descElem.innerText = description
    tempElem.innerText = `${temp.toFixed(0)} °C`
    humidityElem.innerText = `Humidity: ${humidity}%`
    windElem.innerText = `Wind speed: ${speed}km/h`
    weatherElem.classList.remove('loading')
    bodyElem.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
  },
  search: function(){
    this.fetchWeather(document.querySelector('.search-bar').value)
  }
}

document.querySelector(".search button").addEventListener('click', () =>{
  searchWeather.search()
})

document.querySelector(".search-bar").addEventListener('keyup', (event)=>{
  if(event.key == 'Enter'){
    searchWeather.search()
  }
})

//weather.fetchWeather("Rio de janeiro")
