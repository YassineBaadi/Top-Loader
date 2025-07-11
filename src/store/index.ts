'use'

import { configureStore } from "@reduxjs/toolkit"
import pokemonReducer from "../redux/pokemonSlice"

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
