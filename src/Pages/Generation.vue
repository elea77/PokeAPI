<template>
    <div id="body">
        <div id="top" :style="{'background-image': 'url(' + require('@/assets/img/salamandre.png') + ')'}">
                <nav class="navbar">
                        <ul>
                          <li><a :href="$router.resolve('/').href"><img :src="require(`@/assets/img/logo-pokemon.png`)" alt="" class="logo"></a></li>
                            <li>
                                <router-link v-bind:to="'/pokedex'" class="titles-nav">Pokedex</router-link>
                                <router-link v-bind:to="'/generation'" class="titles-nav">Générations</router-link>
                                <router-link v-bind:to="'/team'" class="titles-nav">Team</router-link>
                            </li>
                        </ul>
                </nav>
                <h1>Voici les 7 Générations</h1>
                <a id="scrollButton" href="#corps" class="button">Voir les Générations</a>
        </div>
        <div id="corps" :style="{'background-image': 'url(' + require('@/assets/img/fond_pikachu.png') + ')'}">
            <nav class="navbar">
                <ul>
                  <li><a :href="$router.resolve('/').href"><img :src="require(`@/assets/img/logo-pokemon.png`)" alt="" class="logo"></a></li>
                    <li>
                        <router-link v-bind:to="'/pokedex'" class="titles-nav">Pokedex</router-link>
                        <router-link v-bind:to="'/generation'" class="titles-nav">Générations</router-link>
                        <router-link v-bind:to="'/team'" class="titles-nav">Team</router-link>
                    </li>
                </ul>
            </nav><br><br>
            <h2>Les Générations</h2><br><br>
            <div class="grid">
              <img :src="require(`@/assets/img/g1.png`)" alt="">
              <img :src="require(`@/assets/img/g2.png`)" alt="">
              <img :src="require(`@/assets/img/g3.png`)" alt="">
              <img :src="require(`@/assets/img/g4.png`)" alt="">
            </div>
            <div class="grid-3"><br>
                <img :src="require(`@/assets/img/g5.png`)" alt="">
                <img :src="require(`@/assets/img/g6.png`)" alt="">
                <img :src="require(`@/assets/img/g7.png`)" alt="">
                <br>
            </div><br><br>
            <a href="#top"><img :src="require(`@/assets/img/top_button.png`)" alt="" id="top-button"></a>
        </div>
    </div>
</template>




<style scoped>

* {
  margin: 0;
  padding: 0;
}

#body {
  background-color: rgb(255, 203, 5, 0.15);
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
    background-position: center;
    z-index: 1;
    width: 100%;
    height: 100vh;
}

h2 {
    text-align: center;
    font-size: 270%;
    font-family: 'Tomorrow', sans-serif;
    letter-spacing: 3px;
    color: black;
    margin: 0;
}

.grid img {
    height: auto;
    margin-left: auto;
    margin-right:auto;
    width: 90%;
    transform: scale(0.9);
}

.grid-3 img {
    height: auto;
    margin-left: auto;
    margin-right:auto;
    width: 70%;
    transform: scale(0.9);
}

.grid img:hover, .grid-3 img:hover {
    transition: 0.5s;
    transform: scale(1.02);
}

.grid {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
}

.grid-3 {
    display: grid;
    grid-template-columns: 5% 30% 30% 30% 5%;
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

</style>
        
        