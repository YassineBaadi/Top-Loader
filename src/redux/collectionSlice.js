import { createSlice } from "@reduxjs/toolkit"
import { generateRarity } from "@/src/components/cardsShop/Cards"

const LOCAL_STORAGE_KEY = "pokemon-collection"

function loadCollection() {
  if (typeof window === "undefined") return { cards: [], boosters: [] }
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return { cards: [], boosters: [] }
}

const initialState = loadCollection()

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCardsToCollection: (state, action) => {
  state.cards.push(action.payload)  // ✅ On ajoute un seul objet
  saveCollection(state)
},
    addBoosterToCollection: (state, action) => {
      // Ajouter la rareté aux cartes du booster si elle manque
      const boosterWithRarity = action.payload.map(pokemon => ({
        ...pokemon,
        rarity: pokemon.rarity || generateRarity(pokemon)
      }))
      state.boosters.push(boosterWithRarity)
      saveCollection(state)
    },
    resetCollection: () => {
      saveCollection({ cards: [], boosters: [] })
      return { cards: [], boosters: [] }
    },
    removeBooster: (state, action) => {
      state.boosters.splice(action.payload, 1)
      saveCollection(state)
    }
  }
})

function saveCollection(state) {
  if (typeof window === "undefined") return
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
}

export const {
  addCardsToCollection,
  addBoosterToCollection,
  resetCollection,
  removeBooster 
} = collectionSlice.actions

export default collectionSlice.reducer