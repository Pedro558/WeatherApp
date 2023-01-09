let weather = {
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
    document.querySelector(".city").innerText = `Weather in ${name}`
    document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`
    document.querySelector('.description').innerText = description
    document.querySelector('.temp').innerText = `${temp.toFixed(0)} °C`
    document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`
    document.querySelector('.wind').innerText = `Wind speed: ${speed}km/h`
  },
  search: function(){
    this.fetchWeather(document.querySelector('.search-bar').value)
  }
}

document.querySelector(".search button").addEventListener('click', () =>{
  weather.search()
})