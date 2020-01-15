<template>
	<div id="body">
		<div id="top" :style="{'background-image': 'url(' + require('@/assets/img/carapuce.png') + ')'}">
			<nav id="navbar">
				<ul>
					<li><a :href="$router.resolve('/').href"><img :src="require(`@/assets/img/logo-pokemon.png`)" alt="" class="logo"></a></li>
					<li>
						<router-link v-bind:to="'/pokedex'" class="titles-nav">Pokedex</router-link>
						<router-link v-bind:to="'/generation'" class="titles-nav">Générations</router-link>
						<router-link v-bind:to="'/team'" class="titles-nav">Team</router-link>
					</li>
				</ul>
			</nav>
			<br><br>
			<h1>Vous êtes dans le Pokedex</h1>
      <a id="scrollButton" href="#corps" class="button">Voir les Pokemons</a>
		</div>
		<div id="corps" :style="{'background-image': 'url(' + require('@/assets/img/fond_gris.jpg') + ')'}">
			<nav id="navbar" class="nav">
				<ul>
					<li><a :href="$router.resolve('/').href"><img :src="require(`@/assets/img/logo-pokemon.png`)" alt="" class="logo"></a></li>
					<li>
						<router-link v-bind:to="'/pokedex'" class="titles-nav">Pokedex</router-link>
						<router-link v-bind:to="'/generation'" class="titles-nav">Générations</router-link>
						<router-link v-bind:to="'/team'" class="titles-nav">Team</router-link>
					</li>
				</ul>
			</nav><br><br>
			<h2>Liste des Pokemons</h2><br><br>
			<div id="app">
				<div id="case" v-for="pokemon in pokemons" :key="pokemon.id">
					<li id="link"><router-link v-bind:to="'/pokemon/' + pokemon.id" tag="li">
					<div class="infos"><br>
						<h4>#{{pokemon.id}}</h4>
						<h3 id="name">{{pokemon.name}}</h3>
						<div v-for="types in pokemon.types" :key="types.slot">
							<div v-for="type in types" :key="type.name">
								<h3 id="type">{{type.name}}</h3>
							</div>
						</div>
					</div>
					</router-link></li>
					<div class="image">
						<router-link v-bind:to="'/pokemon/' + pokemon.id"><img id="image" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(pokemon.id)}.png`" v-bind:alt="pokemon.name" srcset=""></router-link>
					</div>
				</div> 
			</div><br>
      <button type="button" v-on:click="previous()" class="btn btn-primary btn-lg">Previous</button>
      <button type="button" v-on:click="next()" class="btn btn-dark btn-lg">Next</button>
			<a href="#top"><img :src="require(`@/assets/img/top_button.png`)" alt="" id="top-button"></a>
			<br><br><br>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'app',
    data() {
        return{
		pokemons: [],
		info: null,
		loading: true,
		imgURL: null,
		types: [],
    PokemonSpecies: [],
    initURL: 'https://pokeapi.co/api/v2/pokemon/',
    PokemonSpecies_url : 'https://pokeapi.co/api/v2/pokemon-species/',
    nextURL_species: [],
    previousURL_species: [],
		previousURL: [],
		nextURL: [],
    }
	},
	methods: {
	padLeft(num, by = 3) {
		return ("0".repeat(by) + num).substr(-3)
	},
    async getPokemon(initURL,initSpeciesURL) {
      const response = await this.$http.get(initURL);
      window.console.log(initURL)
      this.nextURL = response.data.next
	this.previousURL = response.data.previous
      this.pokemons = await Promise.all(response.data.results.map(async ({ url }) => {
        const pokemon = await this.$http.get(url);
        return pokemon.data
      }));
      const response2 = await axios.get(initSpeciesURL)
      this.nextURL_species = response2.data.next
      this.previousURL_species = response2.data.previous
			const pokemons2 = await Promise.all(response2.data.results.map(async ({url}) =>{
				const pokemon = await axios.get(url)
				return pokemon.data.names
      }))
			const pokemon_names = await Promise.all(pokemons2.map(async pokemon_names =>{
				const pokemon_name = pokemon_names.filter(pokemon_name =>pokemon_name.language.name == "fr")
				return pokemon_name
      }))
      for(let i = 0;i<pokemon_names.length;i++){
        this.pokemons[i].name = pokemon_names[i][0].name
      }
  },
		async getPokemonTypes(initURL){
      const response = await axios.get(initURL)
      this.nextURL = response.data.next
	this.previousURL = response.data.previous
			const pokemons = await Promise.all(response.data.results.map(async ({url}) =>{
				const pokemon = await axios.get(url)
				return pokemon.data.types
			}))
			const types_translations2 = await Promise.all(pokemons.map(async types =>{
				const types_url = await Promise.all(types.map(async types_url =>{
					const url = await axios.get(types_url.type.url)
					return url.data.names
				}))
				return types_url
			}))
			const types_translated2 = await Promise.all(types_translations2.map(async types =>{
				const types_display2 = await Promise.all(types.map(async types =>{
					return types.filter(type=> type.language.name == "fr")
				}))
				return types_display2
      }))
      for(let i = 0; i<types_translated2.length; i++){
        for(let x = 0; x <=types_translated2[i].length; x++){
      this.pokemons[i].types[0].type.name = types_translated2[i][0][0].name
      if(this.pokemons[i].types[1] != null){
        this.pokemons[i].types[1].type.name = types_translated2[i][1][0].name}}} 
    },
    next(){
  this.getPokemon(this.nextURL,this.nextURL_species)
  this.getPokemonTypes(this.nextURL)
	},
	previous(){
	this.getPokemon(this.previousURL,this.previousURL_species)
  this.getPokemonTypes(this.previousURL)
  }
  },
  mounted() {
  this.getPokemon(this.initURL,this.PokemonSpecies_url)
  this.getPokemonTypes(this.initURL)

  },
    
}
</script>



<style scoped>

* {
  margin: 0;
  padding: 0;
}

#body {
  color: black;
  font-family: 'Mada', sans-serif;
}

.in-transition {
  transition: transform 900ms ease;
}

/* Top page */


#top {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
  width: 100%;
  height: 100vh;
}

h1 {
	font-size: 45px;
	position: absolute;
	top: 32vh;
	left: 10vw;
	font-family: 'Tomorrow', sans-serif;
}

.button {
  position: absolute;
  top: 48vh;
  left: 18vw;
  background-color:rgb(58, 93, 158);
  padding: 10px;
  font-size: 17px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: white;
  
}

li {
  list-style:none;
  margin-left:0;
  padding-left:0;
  cursor: pointer;
}

#link {
  background-color: rgb(242, 242, 242);
}

/* Navbar */

.logo {
  width: 20%;
  margin-right: 50%;
  margin-left: 5%;
}
nav {
  height: 60px;
  padding: 0;
}

nav ul {
  height: 100% ;
  display: flex;
}

nav ul li {
  height: 100%;
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

nav ul li a {
  text-decoration: none;
  color: black;
  font-size: 120%;
}

.titles-nav:hover {
  color: black;
  border-bottom: 2px solid white;
}



/* Pokedex */

#corps {
  /* background-image: url('img/fond_gris.jpg'); */
  background-color: white;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;

}

h2 {
	text-align: center;
	font-size: 270%;
	font-family: 'Tomorrow', sans-serif;
	letter-spacing: 3px;
	color: black;
	margin: 0;
}

#app {
  display: grid;
  grid-template-columns: repeat(3,33%);
  justify-items: center;
  align-items: center;
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
}


#case {
  color: black;
  width: 80%;
  height: auto;
  display: grid;
  grid-template-columns: 45% 55%;
  margin-block-end: 5%;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-left: 5px solid rgb(242, 242, 242);
  transition: border-color .2s ease-in-out;
}

#case:hover {
  box-shadow: 5px 5px 5px grey; 
  transform:scale(1.05); 
  z-index: 0;
  border-left-style: solid;
  border-color: purple;
  border-width: 5px;
}


/* Fond pour chaque pokemon */

.image {
  background-color:white;
}


/* Taille de l'image pokemon */

#image {
  width: 80%;
  height: auto;
}

/* Fond et info pokemon */

.infos {
  background-color:rgb(242, 242, 242);
  color: black;
}


#name {
  text-transform: capitalize;
  font-size: 25px;
}

/* ID pokemon */
h4 { 
  font-size: 20px;
  margin-block-end: 5%;
}


#top-button {
  float: right;
  width: 3%;
  margin-right: 2%;
  cursor: pointer;
}

#top-button:hover {
  transform: scale(0.9);
}


#type {
  font-size: 15px;
  text-align: center;
  margin-top: 3%;
}


</style>		