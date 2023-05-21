
import AbstractViews from "./AbstractViews.js"
const API_KEY = '0d268b54dab0ffaefcb6b7b9eaeb352a'
// const {API_KEY} =require('./config.js')

export default class extends AbstractViews {
  constructor(params) {
    super(params);
    this.setTitle('Recherche Pays');
  }

  // une méthode asynchrone getHtml qui renvoie le HTML de la vue
  async getHtml() {
    return ` 
      <article class="searchBar">
      <input type="text" class="text" placeholder="recherche...">
      <button class="search-button">Search</button>
      </article>
      <p class="question-recherche">Quel pays recherchez-vous ?</p>
      
      <section class="infos"></section>`
      
  }
  // une autre méthode asynchrone, afterRender, qui est exécutée après le rendu du HTML.
  async afterRender() {
    // récupérez les éléments de la page dont j'ai besoin.(valeur de l'iput et le bouton)
    const searchButton = document.querySelector('.search-button');
    const textInput = document.querySelector(".text");

    // fonction asynchrone, searchAction, qui est exécutée lorsque l'utilisateur clique sur le bouton de recherche ou appuie sur la touche Entrée.
    const searchAction = async () => {
      console.log('click or enter key pressed')
      // récupérez le texte entré par l'utilisateur.
      let textCountry = textInput.value;
      // définir l'URL de l'API en y incluant le texte entré par l'utilisateur.
      let url = "https://restcountries.com/v3.1/name/" + textCountry;
      // une requête à l'API pour obtenir des informations sur le pays.
      const response = await fetch(url);
      const data = await response.json();
      console.log(data[0])

      // extraire les informations dont j'ai besoin de la réponse de l'API.
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
    
    // extraire la température de la réponse de l'API météo.
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

    //les écouteurs d'evenement pour la fonction searchButton
    searchButton.addEventListener('click', searchAction);
    textInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        searchAction();
      }
    });
  }
}
