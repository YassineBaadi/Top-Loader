import { useSelector, useDispatch } from "react-redux"
import useCurrentUser from "@/src/lib/helpers"
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
  const { user, isLoading } = useCurrentUser()
  const email = user?.email

  const dispatch = useDispatch()
  const router = useRouter()

  //  éviter de lire une mauvaise clé si email pas encore dispo
  const cartItems = useSelector((state) => {
    if (!email) return []
    return state.cart.userCarts[email] || []
  })

  const [showLoginModal, setShowLoginModal] = useState(false)

  const isLoggedIn = !!email

  const handleImageClick = (item) => {
    if (item.type === "card") {
      router.push(`/detailcard/${item.data.id}`)
    } else {
      router.push("/shop")
    }
    onClose()
  }

  const sortedItems = [...cartItems].sort(
    (a, b) => (a.data.price || 0) - (b.data.price || 0)
  )

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  let totalPrice = 0
  let discountNote = null

  if (totalQuantity >= 5) {
    const freeItem = sortedItems[0]
    const freePrice = freeItem?.data?.price || 0

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

  // Modifiez cette condition pour permettre l'affichage même sans utilisateur connecté
  if (isLoading) {
    return null
  }

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      <div
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Panier</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {/* Affichage différent selon l'état de connexion */}
        {!isLoggedIn ? (
          <div className="cart-not-logged">
            <p style={{ padding: "1rem" }}>Veuillez vous connecter pour voir votre panier</p>

            <div className="cart-footer">
              <button
                className="cart-checkout"
                onClick={() => {
                  onClose()
                  setTimeout(() => router.push('/login'), 300)
                }}
              >
                Se connecter
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
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
                    <span className="cart-name">{item.data.name || "Booster"}</span>
                    <span className="cart-price">
                      {item.data.price || 0} € × {item.quantity} ={" "}
                      {item.data.price * item.quantity || 0} €
                    </span>
                    <div className="cart-qty">
                      <button onClick={() => dispatch(decreaseQty({ index, email }))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQty({ index, email }))}>+</button>
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
                onClick={() => dispatch(clearCart({ email }))}
                className="cart-clear"
              >
                Vider le panier
              </button>

              <button
                className="cart-checkout"
                onClick={() => {
                  onClose()
                  router.push("/paiement")
                }}
              >
                Commander
              </button>
            </div>
          </>
        )}
      </div>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginForm />
      </Modal>
    </>
  )
}