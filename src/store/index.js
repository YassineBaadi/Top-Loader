import { configureStore } from "@reduxjs/toolkit"

import { combineReducers } from "redux"
import pokemonReducer from "@/src/redux/pokemonSlice"
import collectionReducer from "@/src/redux/collectionSlice"
import cartReducer from "@/src/redux/cartSlice" // ✅ Ajout ici

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
  collection: collectionReducer,
  cart: cartReducer, // ✅ Ajout ici
})


export const store = configureStore({
  reducer: rootReducer,
})

