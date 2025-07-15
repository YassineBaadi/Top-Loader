import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userCarts: {},
}

// ✅ Sécurise l’accès à localStorage
function safeGetLocalStorage(key) {
  if (typeof window === "undefined") return null
  return JSON.parse(localStorage.getItem(key))
}

function safeSetLocalStorage(key, value) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

function saveCartToLocalStorage(email, cart) {
  if (!email || typeof window === "undefined") return
  const saved = safeGetLocalStorage("savedCarts") || {}
  saved[email] = cart
  safeSetLocalStorage("savedCarts", saved)
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const user = safeGetLocalStorage("currentUser")
      if (!user) return
      const email = user.email

      if (!state.userCarts[email]) {
        // Charger depuis le localStorage si disponible
        const savedCarts = safeGetLocalStorage("savedCarts") || {}
        state.userCarts[email] = savedCarts[email] || []
      }

      const existing = state.userCarts[email].findIndex(
        (item) =>
          item.type === action.payload.type &&
          item.data.id === action.payload.data.id
      )

      if (existing !== -1) {
        state.userCarts[email][existing].quantity += 1
      } else {
        state.userCarts[email].push({ ...action.payload, quantity: 1 })
      }

      saveCartToLocalStorage(email, state.userCarts[email])
    },

    increaseQty: (state, action) => {
      const user = safeGetLocalStorage("currentUser")
      if (!user) return
      const email = user.email

      state.userCarts[email][action.payload].quantity += 1
      saveCartToLocalStorage(email, state.userCarts[email])
    },

    decreaseQty: (state, action) => {
      const user = safeGetLocalStorage("currentUser")
      if (!user) return
      const email = user.email

      if (state.userCarts[email][action.payload].quantity > 1) {
        state.userCarts[email][action.payload].quantity -= 1
      } else {
        state.userCarts[email].splice(action.payload, 1)
      }

      saveCartToLocalStorage(email, state.userCarts[email])
    },

    clearCart: (state) => {
      const user = safeGetLocalStorage("currentUser")
      if (!user) return
      const email = user.email

      state.userCarts[email] = []
      saveCartToLocalStorage(email, [])
    },

    clearCartForUser: (state, action) => {
      const email = action.payload
      delete state.userCarts[email]

      const saved = safeGetLocalStorage("savedCarts") || {}
      delete saved[email]
      safeSetLocalStorage("savedCarts", saved)
    },
  },
})

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  clearCart,
  clearCartForUser,
} = cartSlice.actions

export default cartSlice.reducer

export const selectCartCount = (state, email) => {
  const userCart = state.cart.userCarts[email] || []
  return userCart.reduce((sum, item) => sum + item.quantity, 0)
}