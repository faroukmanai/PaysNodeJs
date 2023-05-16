import AbstractViews from "./AbstractViews.js"

export default class extends AbstractViews {
    constructor(params) {
      super(params);
      this.setTitle('Accueil');
    }
    async getHtml() {
      return `
        <h1>Exploration des pays avec Node.js </h1>
        <section>
          <p>Bienvenue sur mon application de recherche de pays! Cette application a été conçue et développée en utilisant Node.js pour fournir un environnement de back-end robuste et efficace.</p>
          <p>Grâce à elle, vous pouvez rechercher n'importe quel pays et obtenir des informations précises et pertinentes comme la capitale et sa météo, le continent sur lequel il se trouve et même visualiser son drapeau.</p>
          <p>L'objectif de cette application est de fournir une plateforme simple mais puissante pour explorer et apprendre sur les différents pays du monde.</p>
        </section>
        <p>API: <a href="https://restcountries.com/" target="_blank">restcountries.com</a> <a href="https://openweathermap.org/guide" target="_blank">openweathermap.org</a><p>
        `;
    }
    async afterRender() {}
  }
  