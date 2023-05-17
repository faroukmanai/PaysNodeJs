
import AbstractViews from "./AbstractViews.js"
const API_KEY = '0d268b54dab0ffaefcb6b7b9eaeb352a'//je dois changer ca

export default class extends AbstractViews {
  constructor(params) {
    super(params);
    this.setTitle('Recherche Pays');
  }

  async getHtml() {
    return ` 
      <article class="searchBar">
      <input type="text" class="text" placeholder="recherche...">
      <button class="search-button">Search</button>
      </article>
      <p class="question-recherche">Quel pays recherchez-vous ?</p>
      
      <section class="infos"></section>`
      
  }

  async afterRender() {
    const searchButton = document.querySelector('.search-button');
    const textInput = document.querySelector(".text");

    const searchAction = async () => {
      console.log('click or enter key pressed')
      let textCountry = textInput.value;

      let url = "https://restcountries.com/v3.1/name/" + textCountry;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data[0])

      const country = data[0]
      const capital = country.capital
      const continent = country.continents
      const population = country.population
      const flag = country.flags.svg
      const timezone = country.timezones

    // Récupération des informations météo pour la capitale
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=`+API_KEY+`&units=metric`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const temperature = weatherData.main.temp;

      const infos = document.querySelector(".infos")



      infos.innerHTML = `
      <article class="carte">
          <img src="${flag}">
          <div>
            <p>Pays: ${textCountry}</p>
            <p>Capitale: ${capital}</p>
            <p>Continent: ${continent}</p>
            <p>Population: ${population} habitants</p>
            <span class="temp">La température actuelle à ${capital} est ${temperature} °C</span>
          </div>
      </article>
      
      `;
    };

    searchButton.addEventListener('click', searchAction);
    textInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        searchAction();
      }
    });
  }
}
