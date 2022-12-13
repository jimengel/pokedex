# POKEDEX
**You may view this live at https://jimengel.github.io/pokedex/**


I always try to use the KIS principle "Keep It Simple"

The following was used to develop this web page
1. Vue.js was choosen for the framework.
2. W3.css was choosen for the css framework
3. Axios  was choosen for an easy to use http client

The application is broken up into different views/files depending on what you are viewing.

- If you are viewing the grid then code from pokeGrid.js is the main code base
- If you are viewing the details then code from pokeDetails.js is the main code base
- pokeHeader.js has the header part of the webpage.
- pokemon.js contains the code to start the vue app as well as reading/writing the api
- The main html is in index.html to allow for github pages to find it.

I choose to read in all pokemon at once since there were only 151 of them, were there more
I would have choose to read in a limited number at a time.


Header image courtesy of https://pokemondb.net
