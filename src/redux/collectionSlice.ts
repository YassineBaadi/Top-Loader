import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type CollectionState = {
  cards: Pokemon[]
  boosters: Pokemon[][]
}

const LOCAL_STORAGE_KEY = "pokemon-collection"

function loadCollection(): CollectionState {
  if (typeof window === "undefined") return { cards: [], boosters: [] }
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return { cards: [], boosters: [] }
}

const initialState: CollectionState = loadCollection()

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCardsToCollection: (state, action: PayloadAction<Pokemon[]>) => {
      state.cards.push(...action.payload)
      saveCollection(state)
    },
    addBoosterToCollection: (state, action: PayloadAction<Pokemon[]>) => {
      state.boosters.push(action.payload)
      saveCollection(state)
    },
    resetCollection: () => {
      saveCollection({ cards: [], boosters: [] })
      return { cards: [], boosters: [] }
    },
    removeBooster: (state, action: PayloadAction<number>) => {
  state.boosters.splice(action.payload, 1)
  saveCollection(state) // si tu as la persistance locale
}
  }
})

function saveCollection(state: CollectionState) {
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
