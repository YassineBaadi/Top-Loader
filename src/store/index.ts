'use'

import { configureStore } from "@reduxjs/toolkit"
import pokemonReducer from "../redux/pokemonSlice"
import collectionReducer from "../redux/collectionSlice"

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    collection: collectionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

