import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchAllPokemon } from "@/src/lib/api"
import { generateRarity, getPrice } from "@/src/components/cardsShop/Cards"


export const fetchPokemons = createAsyncThunk("pokemons/fetch", async () => {
  const data = await fetchAllPokemon()
  return data
})

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.map((pokemon) => {
        const rarity = generateRarity(pokemon)
        const price = getPrice(pokemon.name, rarity)
        return { ...pokemon, rarity, price }
      })

      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default pokemonSlice.reducer
