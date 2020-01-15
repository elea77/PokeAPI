<template>
<div>
 <div class="container">
 <div class="d-flex flex-row flex-wrap">
	<div v-for="pokemon in pokemons" :key="pokemon.id">
		<div class="card">
			<div class="card-header">
				<h5>{{pokemon.id}}</h5>
			</div>
			<div class="card-body mx auto">
				<router-link v-bind:to="'/pokemon/' + pokemon.id"><img class="img-fluid" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeft(pokemon.id)}.png`" v-bind:alt="pokemon.name" srcset=""></router-link>
				<h2 class="card-title">{{pokemon.name}}</h2>
				<div v-for="types in pokemon.types" :key="types.slot">
					<div v-for="type in types" :key="type.name">
					<h3>{{type.name}}</h3>
				</div>
				</div>
			</div>
		</div>
	</div>
 </div>
 </div>
</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return{
		pokemons: [],
		info: null,
		loading: true,
		imgURL: null,
        types: []
        }
	},
	methods: {
padLeft(num, by = 3) {
		return ("0".repeat(by) + num).substr(-3)
	},
    async getPokemon() {
      const response = await this.$http.get("https://pokeapi.co/api/v2/pokemon/");
      this.pokemons = await Promise.all(response.data.results.map(async ({ url }) => {
        const pokemon = await this.$http.get(url);
        return pokemon.data
      }));
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
        this.pokemon.types[i].type.name = types_translated[i]
    }
    },
  },
  mounted() {
	this.getPokemon()
	this.getPokemonTypes()
  },
    
}
</script>