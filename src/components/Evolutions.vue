<template>
<div>
    <div v-if="evolution_3.id == null && evolution_1.id != null " class="evolution">
        <div>
            <p>{{evolution_name_1}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_1.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_1.id)}.png`" style="width: 40%;"></a>
        </div>
        <div>
            <p>{{evolution_name_2}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_2.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_2.id)}.png`" style="width: 40%;"></a>
        </div>
    </div>
    <div v-else-if="evolution_3.id != null " class="evolution">
        <div>
            <p>{{evolution_name_1}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_1.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_1.id)}.png`" style="width: 60%;"></a>
        </div>
        <div>
            <p>{{evolution_name_2}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_2.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_2.id)}.png`" style="width: 60%;"></a>
        </div>
        <div>
            <p class="img-width">{{evolution_name_3}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_3.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_3.id)}.png`" style="width: 60%;"></a>
        </div>
        </div>

        <div v-if="this.id >= 133 && this.id <= 140" class="evolution">
        <div>
            <p>{{evolution_name_1}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_1.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_1.id)}.png`" style="width: 60%;"></a>
        </div>
        <div>
            <p>{{evolution_name_2}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_2.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_2.id)}.png`" style="width: 60%;"></a>
        </div>
            <div>
            <p class="img-width">{{evolution_name_3}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_3.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_3.id)}.png`" style="width: 60%;"></a>
        </div>
        <div>
            <p>{{evolution_name_4}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_4.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_4.id)}.png`" style="width: 60%;"></a>
        </div>
        <div>
            <p>{{evolution_name_5}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_5.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_5.id)}.png`" style="width: 60%;"></a>
        </div>
            <div>
            <p class="img-width">{{evolution_name_6}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_6.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_6.id)}.png`" style="width: 60%;"></a>
        </div>
        <div>
            <p>{{evolution_name_7}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_7.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_7.id)}.png`" style="width: 60%;"></a>
        </div>
            <div>
            <p class="img-width">{{evolution_name_8}}</p>
            <a :href="$router.resolve('/pokemon/' + evolution_8.id).href"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(evolution_8.id)}.png`" style="width: 60%;"></a>
        </div>
        </div>

        <div v-if="evolution_1.id == null ">
            <p>{{PokemonName}} n'a pas d'évolution</p>
        </div>      
</div>
</template>

<style scoped>
.evolution {
    display: inline-flex;
    width: 90%; /* 3 evolutions */
}

.img-fluid {
    box-shadow: 0 4px 4px 0px#212121;
    background-color: #616161;
    border: 5px solid#fff;
    border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

</style>

<script>
import axios from 'axios';
export default {
    name: 'app',
    data() {
        return{
        id: this.$route.params.id,
		pokemons: [],
    evolution_id: null,
    evolutionURL:'https://pokeapi.co/api/v2/pokemon-species/',
		evoli: [133,134,135,136,137,138,139,140],
		evolutions: [],
        evolution_1: [],
        evolution_2: [],
        evolution_3: [],
        evolution_4 : [],
		evolution_5 : [],
		evolution_6 : [],
		evolution_7 : [],
		evolution_8 : [],
        evolution_name_1: [],
        evolution_name_2: [],
        evolution_name_3: [],
        evolution_name_4: [],
		evolution_name_5: [],
		evolution_name_6: [],
		evolution_name_7: [],
		evolution_name_8: [],
        }
	},
	methods: {
        padLeft(num, by = 3) {
		return ("0".repeat(by) + num).substr(-3)
        },
            async getPokemonEvolution(){
			const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.id)
			const url = response.data.evolution_chain.url
			const evolution_url = await axios.get(url)
			const evolution_1 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + evolution_url.data.chain.species.name)
			const evolution_2 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + evolution_url.data.chain.evolves_to[0].species.name)
		if(evolution_url.data.chain.evolves_to[0].evolves_to[0] == undefined){
			const [evo_1,evo_2] = await Promise.all([evolution_1,evolution_2])
			this.evolution_1 = evo_1.data
			this.evolution_2 = evo_2.data
			}
		else{
			const evolution_3 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + evolution_url.data.chain.evolves_to[0].evolves_to[0].species.name)
			const [evo_1,evo_2,evo_3] = await Promise.all([evolution_1,evolution_2,evolution_3])
			this.evolution_1 = evo_1.data
            this.evolution_2 = evo_2.data
            this.evolution_3 = evo_3.data
		}
    },
	async getPokemonEvolutionName(){
        const response = await axios.get('https:///pokeapi.co/api/v2/pokemon-species/' + this.id)
		const url = response.data.evolution_chain.url
		const evolution_url = await axios.get(url)
		const evolution_1 = await axios.get(evolution_url.data.chain.species.url)
		const evolution_2 = await axios.get(evolution_url.data.chain.evolves_to[0].species.url)
      if(evolution_url.data.chain.evolves_to[0].evolves_to[0] == undefined){
		const [evo_1,evo_2] = await Promise.all([evolution_1,evolution_2])
		this.evolution_name_1 = evo_1.data.names[6].name
		this.evolution_name_2 = evo_2.data.names[6].name
    }
      else{
          const evolution_3 = await axios.get(evolution_url.data.chain.evolves_to[0].evolves_to[0].species.url)
		const [evo_1,evo_2,evo_3] = await Promise.all([evolution_1,evolution_2,evolution_3])
			this.evolution_name_1 = evo_1.data.names[6].name
            this.evolution_name_2 = evo_2.data.names[6].name
            this.evolution_name_3 = evo_3.data.names[6].name
      }
    },
    async getEvoliEvolutions(){
		if(this.evolutionURL + this.evoli){
			const response = await axios.get(this.evolutionURL + this.id)
			const url = response.data.evolution_chain.url
			const evolution_url = await axios.get(url)
			const evolution = await Promise.all(evolution_url.data.chain.evolves_to.map(async pokemon =>{ 
			const evolutions = await axios.get(this.evolutionURL + pokemon.species.name)
			return evolutions.data
		}))
			this.evolution_1 = evolution[0]
			this.evolution_2 = evolution[1]
			this.evolution_3 = evolution[2]
			this.evolution_4 = evolution[3]
			this.evolution_5 = evolution[4]
			this.evolution_6 = evolution[5]
			this.evolution_7 = evolution[6]
			this.evolution_8 = evolution[7]
	}
	},
	async getEvoliEvolutionsName(){
		if(this.evolutionURL + this.evoli){
			const response = await axios.get(this.evolutionURL + this.id)
			const url = response.data.evolution_chain.url
			const evolution_url = await axios.get(url)
			const evolution = await Promise.all(evolution_url.data.chain.evolves_to.map(async pokemon =>{ 
			const evolutions = await axios.get(this.evolutionURL + pokemon.species.name)
			return evolutions.data.names.filter(names => names.language.name == "fr")
		}))
			this.evolution_name_1 = evolution[0][0].name
			this.evolution_name_2 = evolution[1][0].name
			this.evolution_name_3 = evolution[2][0].name
			this.evolution_name_4 = evolution[3][0].name
			this.evolution_name_5 = evolution[4][0].name
			this.evolution_name_6 = evolution[5][0].name
			this.evolution_name_7 = evolution[6][0].name
			this.evolution_name_8 = evolution[7][0].name
		}
	},
  },
  mounted() {
      this.getPokemonEvolution()
      this.getPokemonEvolutionName()
      this.getEvoliEvolutions()
      this.getEvoliEvolutionsName()
  },
}
</script>