<template>
      <div :style="{'background-image': 'url(' + require('@/assets/img/pikachu.png') + ')'}" id="body">
          <nav id="navbar">
              <ul>
                  <li><router-link v-bind:to="'/'"><img :src="require(`@/assets/img/logo-pokemon.png`)" alt="" id="logo"></router-link></li>
                  <li>
                      <router-link v-bind:to="'/pokedex'" class="titles-nav">Pokedex</router-link>
                      <router-link v-bind:to="'/generation'" class="titles-nav">Générations</router-link>
                      <router-link v-bind:to="'/team'" class="titles-nav">Team</router-link>
                  </li>
              </ul>
          </nav>
          <br><br>
          <div id="app">
              <p id="bvn">Bienvenue !</p>
              <h2 id="pseudo">{{ pseudo }}</h2>
              <section id="form">
                <p>Veuillez entrer un pseudo :</p><br>
                <input v-model="pseudo" maxlength="16"><br><br>
              </section>
          </div>
      </div>
</template>

<script>
          
export default {
    name: 'app',
    el: '#app',
    data() {
        return{
            pseudo: ''
        }
    }
}

</script>
    
<style scoped>
       
* {
  margin: 0;
  padding: 0;
}
    
    
#body {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  font-family: 'Mada', sans-serif;
}
    
    
/* Navbar */
    
#logo {
  width: 20%;
  margin-right: 50%;
  margin-left: 5%;
}
nav {
  height: 60px;
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

#bvn {
  font-size: 100px;
  position: absolute;
  top: 28vh;
  left: 8vw;
  font-family: 'Tomorrow', sans-serif;
}

#pseudo {
  font-size: 80px;
  position: absolute;
  top: 45vh;
  left: 10vw;
}

#form {
  text-align: center;
  position: absolute;
  top: 58vh;
  left: 18vw;
}


#form p {
  font-size: 140%;
}

#form input {
  border-style: solid;
  border-radius: 4px;
  height: 25px;
  font-size: 12px;
  border-color: rgb(190, 186, 186);
}
    
</style>