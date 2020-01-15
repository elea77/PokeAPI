<template>
  <div id="body">
    <div id="top" :style="{'background-image': 'url(' + require('@/assets/img/bulbizar.png') + ')'}">
      <nav id="navbar">
          <ul>
              <li><a :href="$router.resolve('/').href"><img :src="require(`@/assets/img/logo-pokemon.png`)" alt="" class="logo"></a></li>
              <li>
                  <router-link v-bind:to="'/pokedex'" class="titles-nav">Pokedex</router-link>
                  <router-link v-bind:to="'/generation'" class="titles-nav">Générations</router-link>
                  <router-link v-bind:to="'/monpokemon'" class="titles-nav">Mon Pokemon</router-link>
              </li>
          </ul>
      </nav>
      <br><br>
      <div>
        <h1>Découvrir mon Pokemon</h1>
        <a id="scrollButton" href="#corps" class="button">Voir mon Pokemon</a>
      </div>
    </div>
      <div id="corps" :style="{'background-image': 'url(' + require('@/assets/img/fond_miaouss2.png') + ')'}">
        <nav id="navbar" class="nav">
          <ul>
            <li><a :href="$router.resolve('/').href"><img :src="require(`@/assets/img/logo-pokemon.png`)" alt="" class="logo"></a></li>
            <li>
              <router-link v-bind:to="'/pokedex'" class="titles-nav">Pokedex</router-link>
              <router-link v-bind:to="'/generation'" class="titles-nav">Générations</router-link>
              <router-link v-bind:to="'/monpokemon'" class="titles-nav">Mon Pokemon</router-link>
            </li>
          </ul>
        </nav><br><br>
        <h2>Ton Pokemon est ...</h2><br><br>
        <div id="app">
          <h3 id="name">{{pokemon.name}} !</h3><br><br><br><br>
          <router-link v-bind:to="'/pokemon/' + pokemon.id"><img id="image" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`" v-bind:alt="pokemon.name" srcset=""></router-link>
        </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'app',
    data() {
        return{
          pokemon: [],
          loading: true,
          errored: false,
          types: []
        }
	},
  mounted() {
    const  x = Math.floor((Math.random() * 802) + 1)
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + x)
      .then(response => {
        this.pokemon = response.data,
        this.types = response.data.types
      })
  },
  }

</script>


<style scoped>

* {
  margin: 0;
  padding: 0;
}

/* Top */

#top {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
  width: 100%;
  height: 100vh;
  font-family: 'Mada', sans-serif;
}

#top h1 {
	font-size: 45px;
	position: absolute;
	top: 32vh;
	left: 10vw;
	font-family: 'Tomorrow', sans-serif;
}

h1 {
    font-size: 45px;
    position: absolute;
    top: 32vh;
    left: 5vw;
    font-family: 'Tomorrow', sans-serif;
}

p {
    font-size: 20px;
    position: absolute;
    top: 58vh;
    left: 22vw;
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



/* Corps */

#corps {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
  z-index: 1;
  width: 100%;
  height: 100vh;
}

#app {
  width: 100%;
}

h2 {
	text-align: center;
	font-size: 270%;
	font-family: 'Tomorrow', sans-serif;
	letter-spacing: 3px;
	color: black;
	margin: 0;
}

#name {
  text-transform: uppercase;
  float: right;
  margin-right: 20%;
  font-size: 220%;
}

#image {
    width: 25%;
    float: right;
    margin-right: 15%;
}

#image:hover {
  transform:scale(1.05); 
}



</style>

