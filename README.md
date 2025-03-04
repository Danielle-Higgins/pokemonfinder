# Pokémon-Finder: <a href="https://danielle-higgins.github.io/pokemonfinder/" target="_blank">Visit Here</a>

<p>
  <img src="https://github.com/Danielle-Higgins/pokemonfinder/blob/main/img/preview.png">
</p>

Are you a fan of Pokémon? Visit the PokéFinder website where your able to type in the name of any Pokémon and view its information! From basic data, to its stats, all the way to its evolution chain. Try it out!

## Tech Used

<p>
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
</p>

This project uses the Pokémon API! When the user types in the name of the Pokémon, that Pokémons information will show. What is shown is the Pokédex data, training, base stats, additional information, evolution chart, and it's various Pokédex entries. When using the API, there are three different endpoints that are used in this project. The Pokémon endpoint, the Speicies endpoint, and the Evolution endpoint. Depending on the data that you want to use, making calls to different endpoints may be neccessary. When getting the stats for the Pokémon, I used a horizontal bar chart to display that information. In order to create this chart, I used the chart.js library to accomplish this. Also, when the user hovers over the bars indiviually, it shows the number for that stat. The library gives you access to different types or graphs or charts which you can implement into your project. Some of the data is put into the DOM via the html while other data is added dynamically.

Here is a link to the API I used: <a target="_blank" href="https://pokeapi.co/">Pokeapi</a>
Here is a link to the Library I used: <a target="_blank" href="https://www.chartjs.org/">ChartJs</a>

## Optimizations

If/when I improve this project, I would like to add more data about the Pokémon.

## Lessons Learned

I learned how to insert graphs and charts into my projects. Separation of concerns.
