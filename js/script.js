import { cityElem, iconElem, descElem, tempElem, humidityElem, windElem, weatherElem, bodyElem} from "./elements.js"

class SearchWeather{
    async fetchWeather(city){
      const apiKey = "69aa8e0da4a62bfeac16a488398c391f"
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

      const data = await fetch(endpoint)
      const results = await data.json()
      
      this.displayWeather(results)
  }

  displayWeather(results){  
    const { name } = results
    const { description, icon } = results.weather[0]
    const { temp, humidity } = results.main
    const { speed } = results.wind
    
    console.log(name, description, icon, temp, humidity, speed);

    
    cityElem.innerText = `Weather in ${name}`
    iconElem.src = `https://openweathermap.org/img/wn/${icon}.png`
    descElem.innerText = description
    tempElem.innerText = `${temp.toFixed(0)} °C`
    humidityElem.innerText = `Humidity: ${humidity}%`
    windElem.innerText = `Wind speed: ${speed}km/h`
    weatherElem.classList.remove('loading')
    bodyElem.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
    
  }

  search(){
    this.fetchWeather(document.querySelector('.search-bar').value)
  }
}

const weather = new SearchWeather()

document.querySelector(".search button").addEventListener('click', () =>{
  weather.search()
})

document.querySelector(".search-bar").addEventListener('keyup', (event)=>{
  if(event.key == 'Enter'){
    weather.search()
  }
})