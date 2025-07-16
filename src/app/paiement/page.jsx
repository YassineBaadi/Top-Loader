"use client"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { addCardsToCollection, addBoosterToCollection } from "@/src/redux/collectionSlice"
import { clearCart } from "@/src/redux/cartSlice"
import './page.css'
import { useRouter } from "next/navigation"

// ...imports existants
export default function PaiementPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("Carte bancaire")
  const [success, setSuccess] = useState(false)

  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardCVC, setCardCVC] = useState("")
  const [cardType, setCardType] = useState("")

  const cart = useSelector((state) =>
    userEmail ? state.cart.userCarts[userEmail] || [] : []
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("currentUser"))
      if (!user) {
        router.push("/login")
      } else {
        setUserEmail(user.email)
      }
    }
  }, [])

  useEffect(() => {
    const firstDigit = cardNumber.charAt(0)
    if (firstDigit === "5") setCardType("Mastercard")
    else if (firstDigit === "4") setCardType("VISA")
    else setCardType("")
  }, [cardNumber])

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  let totalPrice = 0

  if (totalQuantity >= 5) {
    const sorted = [...cart].sort(
      (a, b) => (a.data.price || 0) - (b.data.price || 0)
    )
    const freePrice = sorted[0]?.data.price || 0
    totalPrice = cart.reduce((sum, item) => {
      return sum + (item.data.price || 0) * item.quantity
    }, 0) - freePrice
  } else {
    totalPrice = cart.reduce((sum, item) => {
      return sum + (item.data.price || 0) * item.quantity
    }, 0)
  }

  const handlePaiement = () => {
    if (!userEmail) return

    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        if (item.type === "card") {
          dispatch(addCardsToCollection([item.data]))
        } else if (item.type === "booster") {
          dispatch(addBoosterToCollection(item.data.cards))
        }
      }
    })

    dispatch(clearCart())
    setSuccess(true)
    setTimeout(() => {
      router.push("/collection")
    }, 2000)
  }

  const isFormValid = cardName && cardNumber && cardCVC

  if (!userEmail) return null

  return (
    <div className="paiement-page">
      <h1>Paiement</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="recap-liste">
            {cart.map((item, idx) => (
              <li key={idx} className="recap-item">
                <img
                  src={item.data.image || item.data.cards?.[0]?.image}
                  alt={item.data.name || "Booster"}
                  className="recap-img"
                />
                <div className="recap-info">
                  <strong>{item.data.name || "Booster"}</strong>
                  <p>
                    {item.quantity} × {item.data.price} € ={" "}
                    {item.quantity * item.data.price} €
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="total-section">
            <h3>Total : {totalPrice} €</h3>
            {totalQuantity >= 5 && (
              <p style={{ color: "green", fontWeight: "bold" }}>
               Le moins cher est offert !
              </p>
            )}
          </div>

          <div className="payment-method">
            <label>Moyen de paiement :</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Carte bancaire</option>
              <option>PayPal</option>
              <option>Pokedollars</option>
            </select>

            <input
              type="text"
              placeholder="Nom sur la carte"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="text"
                placeholder="Numéro de carte"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              />
              <small>{cardType}</small>
            </div>

            <input
              type="text"
              placeholder="CVC"
              value={cardCVC}
              onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ''))}
              maxLength={4}
            />
          </div>

          <button
            className="validate-btn"
            onClick={handlePaiement}
            disabled={!isFormValid}
            style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? "pointer" : "not-allowed" }}
          >
            Valider la commande
          </button>
        </>
      )}

      {success && (
        <p className="success-msg">
          Commande validée ! Ajout dans la collection...
        </p>
      )}
    </div>
  )
}

