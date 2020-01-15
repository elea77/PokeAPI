import Pokedex from './Pages/Pokedex.vue'
import Pokemon from './Pages/Pokemon.vue'
import Index from './Pages/Index.vue'
import Generation from './Pages/Generation.vue'
import Team from './Pages/Team.vue'

export default [
            { path: '/', component: Index},
            { path: '/pokedex', component: Pokedex},
            { path: '/pokemon/:id', props:true, component: Pokemon },
            { path: '/generation', component: Generation},
            { path: '/team', component: Team },
            { path: '*', redirect: '/'},
]

