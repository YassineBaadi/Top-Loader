import { configureStore } from "@reduxjs/toolkit"
import pokemonReducer from "@/src/redux/pokemonSlice"
import collectionReducer from "@/src/redux/collectionSlice"

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    collection: collectionReducer,
  },
})
