import { useSelector, useDispatch } from "react-redux"
import {
  clearCart,
  increaseQty,
  decreaseQty,
} from "@/src/redux/cartSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Modal from "../modal/Modal"
import LoginForm from "@/src/features/auth/LoginForm"
import "./CartDrawer.css"

export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const router = useRouter()
const user = JSON.parse(localStorage.getItem("currentUser"))
const email = user?.email
const cartItems = useSelector((state) => state.cart.userCarts[email] || [])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    setIsLoggedIn(!!user)
  }, [])

  const handleImageClick = (item) => {
    if (item.type === "card") {
      router.push(`/detailcard/${item.data.id}`)
    } else {
      router.push("/shop")
    }
    onClose()
  }



// Clone et trier les articles par prix unitaire croissant
const sortedItems = [...cartItems].sort(
  (a, b) => (a.data.price || 0) - (b.data.price || 0)
)

const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

let totalPrice = 0
let discountNote = null

if (totalQuantity >= 5) {
  // Trouver l'article le moins cher (unitaire)
  const freeItem = sortedItems[0]
  const freePrice = freeItem.data.price || 0

  // Calculer le prix total avec une unité gratuite
  totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.data.price || 0
    return sum + itemPrice * item.quantity
  }, 0) - freePrice

  discountNote = ` ${freeItem.data.name || "Article"} le moins cher offert (-${freePrice} €)`
} else {
  totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.data.price || 0
    return sum + itemPrice * item.quantity
  }, 0)
}



  return (
    <>
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2> Panier</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Votre panier est vide.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img
  src={
    item.type === "booster"
      ? item.data.image || "/assets/img/boosterRocket.png"

      : item.data.image
  }
  alt={item.data.name || "Booster"}
  onClick={() => handleImageClick(item)}
  className="cart-img"
/>

                  <div className="cart-info">
                    <span className="cart-name">{item.data.name  || "Booster"}</span>
                    <span className="cart-price">
                      {item.data.price || 0} € × {item.quantity} ={" "}
                      {item.data.price * item.quantity || 0} €
                    </span>
                    <div className="cart-qty">
                      <button onClick={() => dispatch(decreaseQty(index))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQty(index))}>+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
  <strong>Total : {totalPrice.toLocaleString()} €</strong>
  {discountNote && (
    <p style={{ color: "green", fontWeight: "bold", marginTop: "0.5rem" }}>
      {discountNote}
    </p>
  )}
</div>


              <button
                onClick={() => dispatch(clearCart())}
                className="cart-clear"
              >
                Vider le panier
              </button>

              {isLoggedIn ? (
                <button
                  className="cart-checkout"
                  onClick={() => router.push("/paiement")}
                >
                   Commander
                </button>
              ) : (
                <button
                  className="cart-checkout"
                  onClick={() => setShowLoginModal(true)}
                >
                  Se connecter
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* 🔐 Modal de connexion */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginForm />
      </Modal>
    </>
  )
}
