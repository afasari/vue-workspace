<script>
export default {
  data: () => ({
    pokemonList: [],
    viewedAsDetail: false,
    pokemonDetail: "",
    search: "",
    suggestedPokemon: ""
  }),
  methods: {
    async getEachPokemon(result){
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+result.entry_number);
      let data = await response.json();
      this.pokemonList.push(data)
      this.pokemonList.sort((a,b) => a.id - b.id)
    },
    async viewDetailPokemon(pokemonName){
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName);
      let data = await response.json();
      this.pokemonDetail = data
      this.viewedAsDetail = true
    }
  },
  watch: {
    search() {
      const searchTerm = this.search.toLowerCase();
      let filteredPokemon = this.pokemonList.filter(item => {
        return item.name.toLowerCase().includes(searchTerm)
      })
      this.suggestedPokemon = filteredPokemon.slice(0,3)
    }
  },
  async mounted() {
    const pokeData = await fetch('https://pokeapi.co/api/v2/pokedex/2/').then(
      response => response.json()
    )
    
    pokeData.pokemon_entries.forEach(item => {
      this.getEachPokemon(item)
    })
  }
}
</script>

<template>
  <div class="container-fluid bg-dark bg-gradient">
    <div class="row pt-5">
    </div>
    <div class="container bg-dark" style="min-height: 100vh;">
      <div class="row justify-content-center">
        <div class="col-5">
          <a href="https://www.pokemon.com/us" target="_blank">
            <img src="./assets/pokemon.svg" class="logo" alt="Pokemon logo" />
          </a>
        </div>
      </div>
      
      <div class="row justify-content-center mt-5 text-white">
        <div class="col-6">
          <input type="text" class="form-control" placeholder="search pokemon" v-model="search">
          <div class="mt-2">
            <label>Suggestions: </label>
            <div class="suggestions-container">
              <span 
                v-for="(i, index) in suggestedPokemon" 
                :key="`suggestion-${index}`" 
                class="suggested-pokemon"
                @click="viewDetailPokemon(i.name)"
              >
                {{ i.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="main mt-5 pt-5">
        <div class="view-all text-white" v-if="!viewedAsDetail">
          <div class="row px-5">
            <div class="col-12 col-md-4 col-lg-3 mb-3" v-for="(pokemon,index) in pokemonList" :key="`poke-${index}`" @click="viewDetailPokemon(pokemon.name)">
              <div class="card text-center">
                <img :src="pokemon.sprites.other.home.front_default" :alt="pokemon.name">
                <div class="pokemon-name">
                  {{pokemon.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="view-detail text-white" v-else>
          <div class="mb-5">
          <button @click="viewedAsDetail=false">
            View All Pokemon
          </button>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="card">
                <img :src="pokemonDetail.sprites.other.home.front_default" alt="">
                <label style="font-size: 18px;" for="">
                </label>
              </div>
            </div>
            <div class="col-12 col-md-6">
                <h2>
                {{ pokemonDetail.name }}
                </h2>
                <p>
                  <label>Types: </label><br/>
                  <span v-for="(type, index) in pokemonDetail.types" :key="`type-${index}`" class="type-badge">
                    {{ type.type.name }}
                  </span>
                </p>
                <p>
                  <label>Skills: </label><br/>
                  <span v-for="(move, index) in pokemonDetail.moves" :key="`move-${index}`" class="move-badge">
                    {{ move.move.name }}
                  </span>
                </p>
            </div>
          </div>
        </div>
        <div class="row pt-5">
        </div>
      </div>
    </div>
    <div class="row pt-5">
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 100%;
  height: 150px;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  text-align: center;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.card{
  background: rgba(255, 255,255,0.21);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.1);
  backdrop-filter: blur(9px);
  border-left: 2px solid rgba(255, 255,255,0.50);
  border-right: 2px solid rgba(255, 255,255,0.50);
}
.pokemon-name {
  text-transform: capitalize;
  padding: 8px;
  font-weight: 500;
}
.suggestions-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
}
.suggested-pokemon {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 16px;
  transition: background-color 0.2s;
}
.suggested-pokemon:hover {
  background: rgba(255, 255, 255, 0.3);
}
.card {
  cursor: pointer;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>
