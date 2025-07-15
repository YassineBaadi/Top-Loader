import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  collection: [],
  boosters: [],
}

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCardsToCollection(state, action) {
      state.collection.push(...action.payload)
    },
    addBoosterToCollection(state, action) {
      state.boosters.push(action.payload)
    },
    removeBooster(state, action) {
      state.boosters.splice(action.payload, 1)
    },
    clearCollection(state) {
      state.collection = []
      state.boosters = []
    },
  },
})

export const {
  addCardsToCollection,
  addBoosterToCollection,
  removeBooster,
  clearCollection,
} = collectionSlice.actions

export default collectionSlice.reducer
