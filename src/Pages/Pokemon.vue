<template> 
<div id="app">
    <div class="container">
        <div id="left">
            <router-link v-bind:to="'/pokedex'" class="titles-nav"><img :src="require(`@/assets/img/back_button_white.png`)" alt="" id="back-button"></router-link>
            <img class="pokemon" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(PokemonData.id)}.png`" v-bind:alt="PokemonData.name" srcset="">
            <h2> #{{id}} {{PokemonName}}</h2>
            <div v-for="types in PokemonData.types" :key="types.slot">
                <div v-for="type in types" :key="type.name">
                    <h4>{{type.name}}</h4>
                </div>
            </div>
            <br> 
            <Evolutions></Evolutions>
        </div>
        <div id="right">
            <div style="margin: 2%;">
                <p class="legende">DESCRIPTION</p>
                <div v-for="text in description" :key="text" class="caracteristique">
                    <p>{{text}}</p>
                </div><br>
                <div class="caracteristique">
                    <p class="legende">CATEGORIE</p>
                    <p>{{Category}}</p><br>
                    <p class="legende">STATS</p>
                    <div v-for="stats in PokemonData.stats" :key="stats" id="test">
                        <p>{{stats.stat.name}}</p>
                        <div class="progress">
                            <div class="progress-bar bg-warning" role="progressbar" v-bind:style="{ width: stats.base_stat + '%' }" style="color:black;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{stats.base_stat}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

.container {
    max-width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 70% 30%;
    width: 100vw;
    height: 100vh;
    font-family: 'Mada', sans-serif;
    background-color: rgb(41, 41, 41);
    color: white;
}


.pokemon {
    width: 40%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

p {
    margin: 0;
}

#left {
    text-align: center;
    background-color: rgb(41, 41, 41);
}

#back-button {
  float: left;
  width: 4%;
  cursor: pointer;
  position: absolute;
  left: 1vw;
}

#back-button:hover {
  transform: scale(0.9);
}

#right {
    width: 100%;
    margin-top: 2%;
    margin-block-end: 2%;
    border-top-left-radius: 15px 15px;
    border-bottom-left-radius: 15px 15px;
    border-color: rgb(30, 30, 30);
    box-shadow: -10px 0px 10px 1px rgb(29, 29, 29);
    background-color: rgb(41, 41, 41);
}

.legende {
    text-decoration: underline rgb(254, 211, 65) 3px;
}

.caracteristique {
    margin-top: 1%;
    margin-left: 1%;
}

</style>

<script>
import axios from 'axios';
import Evolutions from '../components/Evolutions'
export default {
    name: 'app',
    components:{
        Evolutions
    },
    data() {
        return{
        id: this.$route.params.id,
        PokemonData : [],
        PokemonSpecies : [],
        PokemonName: null,
        Category: null,
        description: [],
        stats_name: [],
        }
    },
    methods: {
    padLeft(num, by = 3) {
		return ("0".repeat(by) + num).substr(-3)
    },
      getPokemondata() {
          axios
          .get("https://pokeapi.co/api/v2/pokemon/" + this.id)
          .then(response => {
          this.PokemonData = response.data
      })
      },
       getPokemonspecies() {
          axios
          .get("https://pokeapi.co/api/v2/pokemon-species/" + this.id)
          .then(response => {
            this.PokemonSpecies = response.data,
          response.data.names.forEach(name =>{
              if(name.language.name == 'fr') {
                  return this.PokemonName = name.name
              }
          }),
          response.data.genera.forEach(genera => {
              if(genera.language.name == 'fr'){
                  return this.Category = genera.genus.substr(8)
              } 
          }),
          this.evolution_id = response.data.evolution_chain
      })
      },
    async getPokemonDescription(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.id)
        const description = response.data.flavor_text_entries
        const description2 = description.filter(description => description.language.name == "fr")
        const distinctdescription = [...new Set(description2.map(item => item.flavor_text.replace(/\n|\r/g,' ')))]
        this.description = distinctdescription 
        },
    async getPokemonStats() {
	const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + this.id);
	const stats = response.data.stats
	const stats_translations = await Promise.all(stats.map(async stats =>{
		const stat_translation = await axios.get(stats.stat.url)	
		return stat_translation.data.names
	}))
	const stats_translated = await Promise.all(stats_translations.map(stat =>{
		const stats_display = stat.filter(stat => stat.language.name == "fr")
		return stats_display[0].name
	}))
    for(let i = 0; i<stats_translated.length; i++){
        this.PokemonData.stats[i].stat.name = stats_translated[i]
    }
},
	async getPokemonTypes(){
		const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + this.id)
		const types = response.data.types
		const types_translations = await Promise.all(types.map(async types =>{
			const type_translations = await axios.get(types.type.url)
			return type_translations.data.names
		}))
		const types_translated = await Promise.all(types_translations.map(async types =>{
			const types_display = types.filter(type => type.language.name == "fr")
			return types_display[0].name
		}))	
        for(let i = 0; i<types_translated.length; i++){
            this.PokemonData.types[i].type.name = types_translated[i]
        }
    },
    },
    mounted() {
        this.getPokemondata()
        this.getPokemonspecies()
        this.getPokemonDescription()
        this.getPokemonStats()
        this.getPokemonTypes()
    }
}
</script>