import {  weatherElem, bodyElem, searchBar, searchButton } from "./elements.js"

class SearchWeather{
    async fetchWeather(city){
      try{
        const apiKey = "69aa8e0da4a62bfeac16a488398c391f"
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  
        const data = await fetch(endpoint)
        const results = await data.json()
        
        this.displayWeather(results)
      } catch(error){
        weatherElem.innerHTML = `<h2>Digite um nome válido</h2>`
      }
  }

  displayWeather(results){  
    const { name } = results
    const { description, icon } = results.weather[0]
    const { temp, humidity } = results.main
    const { speed } = results.wind
    
    weatherElem.innerHTML = `
    <h1 class="city">Weather in ${name}</h1>
      
      <div class="temp-icon">
        <h2 class="temp">${temp.toFixed(0)} °C</h2>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather_icon" class="icon"/>
      </div>

      <div class="weather-text">
        <div class="description">${description}</div>
        <div class="humidity">Humidity: ${humidity}</div>
        <div class="wind">Wind speed: ${speed}km/h</div>
      </div>
    `

    bodyElem.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
    
  }

  search(){
    this.fetchWeather(searchBar.value)
  }
}

const weather = new SearchWeather()

searchButton.addEventListener('click', () =>{
  weather.search()
})

searchBar.addEventListener('keyup', (event)=>{
  if(event.key == 'Enter'){
    weather.search()
  }
})