// API Used: https://pokeapi.co/

// Pokemon endpoint: https://pokeapi.co/api/v2/pokemon/{id or name}
// cries
// forms
// held items
// location area encounters
// moves

// species (endpoint) ✅
// color
// egg groups
// evolution chain
// evolves from
// flavor text
// generation (first appears)
// habitat
// pokedex numbers ✅

// stats

class PokeFinder {
  // private variables
  #BASEURL = "https://pokeapi.co/";

  constructor(form, input) {
    this.form = document.getElementById(form);
    this.input = document.getElementById(input);

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    // grab onto value in input
    const pokemonName = this.input.value.trim().toLowerCase();

    // check if input is empty
    if (!pokemonName) return;
    else this.getPokemon(pokemonName);

    // reset the input value
    this.input.value = "";
  }

  async getPokemon(pokemonName) {
    const pokeapi = `${this.#BASEURL}api/v2/pokemon/${pokemonName}`;

    try {
      const response = await fetch(pokeapi);
      if (!response.ok) throw new Error("Network response was not ok!");

      const data = await response.json();
      console.log(data);

      // extract the species data too
      const speciesResponse = await fetch(data.species.url);
      if (!speciesResponse.ok) throw new Error("Network response was not ok!");

      const speciesData = await speciesResponse.json();
      console.log(speciesData);

      this.getPokemonInfo(data, speciesData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  getPokemonInfo(data, speciesData) {
    // pokemon name into the DOM
    const pokemonName = document.querySelector(".pokemon-name");
    pokemonName.textContent = data.name;

    // pokemon image into the DOM
    const pokemonImg = document.querySelector(".pokemon-img img");
    pokemonImg.src = data.sprites.other.home.front_default;
    pokemonImg.alt = data.name;

    this.getPokedexData(data, speciesData);
    this.getTrainingInfo(data, speciesData);
  }

  getPokedexData(data, speciesData) {
    // national dex num into the DOM
    const nationalDex = document.getElementById("dex-num");
    nationalDex.textContent = speciesData.pokedex_numbers[0].entry_number;

    // type into the DOM
    const type = document.getElementById("type");
    type.textContent = data.types.map((obj) => obj.type.name).join(", ");

    // species into the DOM
    const species = document.getElementById("species");
    species.textContent = speciesData.genera.find(
      (item) => item.language.name === "en"
    ).genus;

    // height into the DOM
    const height = document.getElementById("height");
    height.textContent = data.height;

    // weight into the DOM
    const weight = document.getElementById("weight");
    weight.textContent = data.weight;

    // abilities into the DOM
    const abilities = document.getElementById("abilities");
    abilities.textContent = data.abilities
      .map((obj) => obj.ability.name)
      .join(", ");
  }

  getTrainingInfo(data, speciesData) {
    // put capture rate into the DOM
    const captureRate = document.getElementById("catch-rate");
    captureRate.textContent = speciesData.capture_rate;

    // put base happiness into the DOM
    const baseHappiness = document.getElementById("happiness");
    baseHappiness.textContent = speciesData.base_happiness;

    // put base experience into the DOM
    const baseExperience = document.getElementById("exp");
    baseExperience.textContent = data.base_experience;

    // put growth rate into the DOM
    const growthRate = document.getElementById("growth");
    growthRate.textContent = speciesData.growth_rate.name;
  }
}

const pokemon = new PokeFinder("form", "search");
