import { createSlice } from "@reduxjs/toolkit"
import { generateRarity } from "@/src/components/cardsShop/Cards"

function getCollectionKey(email) {
  return `pokemon-collection-${email}`
}

function loadCollection(email) {
  if (typeof window === "undefined" || !email) return { cards: [], boosters: [] }

  const stored = localStorage.getItem(getCollectionKey(email))
  if (stored) return JSON.parse(stored)

  return { cards: [], boosters: [] }
}

function saveCollection(email, state) {
  if (typeof window === "undefined" || !email) return
  localStorage.setItem(getCollectionKey(email), JSON.stringify(state))
}

const initialState = {
  userCollections: {}, // Clé = email
}

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCardsToCollection: (state, action) => {
      const { email, cards } = action.payload
      if (!email) return

      if (!state.userCollections[email]) {
        state.userCollections[email] = loadCollection(email)
      }

      const cardList = Array.isArray(cards) ? cards : [cards]
      state.userCollections[email].cards.push(...cardList)
      saveCollection(email, state.userCollections[email])
    },

    addBoosterToCollection: (state, action) => {
      const { email, booster } = action.payload
      if (!email) return

      if (!state.userCollections[email]) {
        state.userCollections[email] = loadCollection(email)
      }

      const boosterWithRarity = booster.map(pokemon => ({
        ...pokemon,
        rarity: pokemon.rarity || generateRarity(pokemon),
      }))

      state.userCollections[email].boosters.push(boosterWithRarity)
      saveCollection(email, state.userCollections[email])
    },

    resetCollection: (state, action) => {
      const { email } = action.payload
      if (!email) return

      state.userCollections[email] = { cards: [], boosters: [] }
      saveCollection(email, state.userCollections[email])
    },

    removeBooster: (state, action) => {
      const { email, index } = action.payload
      if (!email || !state.userCollections[email]) return

      state.userCollections[email].boosters.splice(index, 1)
      saveCollection(email, state.userCollections[email])
    },
    loadUserCollection: (state, action) => {
  const { email } = action.payload
  if (!email) return

  state.userCollections[email] = loadCollection(email)
}
  },
})

export const {
  addCardsToCollection,
  addBoosterToCollection,
  resetCollection,
  removeBooster,
  loadUserCollection
} = collectionSlice.actions

export default collectionSlice.reducer

// 🧠 Helper pour sélectionner la collection depuis Redux
const emptyCollection = { cards: [], boosters: [] }

export const selectUserCollection = (state, email) =>
  state.collection.userCollections[email] || emptyCollection

