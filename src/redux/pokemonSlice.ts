import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllPokemons } from "@/src/lib/api"

type Pokemon = {
  id: number
  name: string
  image: string
  hp: number
  attack: number
  defense: number
  apiTypes: { name: string }[]
  rarity: number
}

type State = {
  data: Pokemon[]
  loading: boolean
  error: string | null
}

const initialState: State = {
  data: [],
  loading: false,
  error: null
}

export const fetchPokemons = createAsyncThunk("pokemons/fetch", async () => {
  const response = await getAllPokemons()
  return response
})

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Erreur"
      })
  }
})

export default pokemonSlice.reducer
