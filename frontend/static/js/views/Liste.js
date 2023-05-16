import AbstractViews from "./AbstractViews.js"

export default class extends AbstractViews {
  constructor(params) {
    super(params);
    this.setTitle('Liste de tous les pays');
  }

  async getHtml() {
    return ` 
      <div class="tri">
          <a href="#" id="triPopulation">Par population</a>
          <a href="#" id="triNom">Par nom</a>
      </div>
      <section class="infos-liste">
        
      </section>`  
  }

  async afterRender() {
    const infos = document.querySelector(".infos-liste");
    let data; // Déclaration de la variable 'data' en dehors de la promesse fetch

    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
      data = countries; // Définition de la variable 'data'
      data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // Tri initial par ordre alphabétique
      this.displayCountries(data, infos);
    })
    .catch((error) => console.error('Error:', error));

    const triPopulation = document.querySelector('#triPopulation');
    const triNom = document.querySelector('#triNom');

    let isPopulationDescending = true;
    let isNameDescending = false;

    // Ajout d'écouteurs d'événements pour trier par population
    triPopulation.addEventListener('click', (event) => {
      event.preventDefault(); // Empêche le comportement par défaut du lien
      data.sort((a, b) => isPopulationDescending ? b.population - a.population : a.population - b.population);  // Tri par population 
      this.displayCountries(data, infos);
      isPopulationDescending = !isPopulationDescending; // Inverse l'ordre du tri
    });

    // Ajout d'écouteurs d'événements pour trier par nom
    triNom.addEventListener('click', (event) => {
      event.preventDefault(); // Empêche le comportement par défaut du lien
      data.sort((a, b) => isNameDescending ? b.name.common.localeCompare(a.name.common) : a.name.common.localeCompare(b.name.common)); // Tri par ordre alphabétique
      this.displayCountries(data, infos);
      isNameDescending = !isNameDescending; // Inverse l'ordre du tri
    });
  }

  displayCountries(countries, container) {
    let html = ''; // Crée une variable pour contenir la chaîne HTML
  
    countries.forEach(country => {
      html += `
        <article class="carte-pays">
          <img class="petite-img" src="${country.flags.svg}">
          <h4>${country.name.common}</h4>
        </article>
      `;
    });
  
    container.innerHTML = html; // Ajoute la chaîne HTML complète au DOM une seule fois
  }
}
