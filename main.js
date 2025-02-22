// API Used: https://pokeapi.co/

// Pokemon endpoint: https://pokeapi.co/api/v2/pokemon/{id or name}
// cries
// moves

// species (endpoint) ✅
// evolution chain
// evolves from
// flavor text
// pokedex numbers ✅

// created a bar chart using https://www.chartjs.org/

class PokeFinder {
  // private variables
  #BASEURL = "https://pokeapi.co/";
  #chartInstance = null;

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

  // get pokemon data
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
      this.getStatsAndMore(data, speciesData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  // get the pokemon info
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

  // get the pokemons pokedex data
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

  // get training info of the pokemon
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

  // get stats and additional info
  getStatsAndMore(data, speciesData) {
    this.getPokemonStats(data.stats);
    this.getAdditionalInfo(data, speciesData);
  }

  // create a bar chart for pokemon stats
  getPokemonStats(stats) {
    const myChart = document.getElementById("myChart").getContext("2d");

    // change the font size and color of the chart
    Chart.defaults.font.size = 16;
    Chart.defaults.color = "#fff";

    const statName = stats.map((obj) => obj.stat.name);
    const baseStat = stats.map((obj) => obj.base_stat);

    // Destroy the existing chart before creating a new one
    if (this.#chartInstance) this.#chartInstance.destroy();

    // creating our chart
    this.#chartInstance = new Chart(myChart, {
      type: "bar", // using a bar chart
      data: {
        labels: statName,
        datasets: [
          {
            label: "Base Stats",
            data: baseStat,
            backgroundColor: [
              "rgb(233, 51, 36)",
              "rgb(225, 132, 69)",
              "rgb(242, 210, 84)",
              "rgb(111, 140, 232)",
              "rgb(138, 197, 97)",
              "rgb(231, 97, 137)",
            ],
            borderWidth: 1,
            hoverBorderWidth: 2,
            hoverBorderColor: "#000",
          },
        ],
      },
      options: {
        indexAxis: "y", // horizontal bar chart
        responsive: true,
        plugins: {
          legend: {
            // remove the legend from chart
            display: false,
          },
        },
      },
    });
  }

  // get additional pokemon info
  getAdditionalInfo(data, speciesData) {
    // put pokemon forms into DOM
    const forms = document.getElementById("forms");
    forms.textContent = data.forms.map((obj) => obj.name).join(", ");

    // put held items into DOM
    const heldItems = document.getElementById("held-items");
    if (data.held_items.length === 0) heldItems.textContent = "none";
    else
      heldItems.textContent = data.held_items
        .map((obj) => obj.item.name)
        .join(", ");

    // put color into DOM
    const color = document.getElementById("color");
    color.textContent = speciesData.color.name;

    // put egg groups into DOM
    const eggGroups = document.getElementById("egg-groups");
    eggGroups.textContent = speciesData.egg_groups
      .map((obj) => obj.name)
      .join(", ");

    // put generation into DOM
    const generation = document.getElementById("generation");
    generation.textContent = speciesData.generation.name;

    // put habitat into DOM
    const habitat = document.getElementById("habitat");
    if (!speciesData.habitat) habitat.textContent = "none";
    else habitat.textContent = speciesData.habitat.name;
  }
}

const pokemon = new PokeFinder("form", "search");
