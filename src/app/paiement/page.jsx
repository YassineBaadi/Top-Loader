"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { clearCart } from "@/src/redux/cartSlice"
import { addCardsToCollection, addBoosterToCollection } from "@/src/redux/collectionSlice"
import useCurrentUser from "@/src/lib/helpers"
import Footer from "../../components/footer/Footer"
import "./page.css"

export default function PaiementPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, isLoading } = useCurrentUser()
  const email = user?.email

  // 💡 Toujours appeler les hooks avant tout return ou logique conditionnelle
  const cart = useSelector((state) => {
    if (!email) return []
    return state.cart.userCarts[email] || []
  })

  const [success, setSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("Carte bancaire")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardCVC, setCardCVC] = useState("")
  const [cardType, setCardType] = useState("")

  // 🔁 Redirection si non connecté
  useEffect(() => {
    console.log("🔍 Vérification utilisateur - isLoading:", isLoading, ", user:", user)
    if (!isLoading && !email) {
      console.warn("🚨 Redirection vers /login car email manquant")
      router.push("/login")
    }
  }, [isLoading, email, router, user])

  // 📦 Détection du type de carte
  useEffect(() => {
    const firstDigit = cardNumber.charAt(0)
    setCardType(firstDigit === "5" ? "Mastercard" : firstDigit === "4" ? "VISA" : "")
  }, [cardNumber])

  // 🧮 Calcul du prix total
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = totalQuantity >= 5
  ? cart.reduce((sum, item) => sum + (item.data.price || 0) * item.quantity, 0) -
    ([...cart].sort((a, b) => (a.data.price || 0) - (b.data.price || 0))[0]?.data.price || 0)
  : cart.reduce((sum, item) => sum + (item.data.price || 0) * item.quantity, 0)

  const handlePaiement = () => {
    if (!email) return

    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        if (item.type === "card") {
          dispatch(addCardsToCollection({ email, cards: item.data }))
        } else if (item.type === "booster") {
          dispatch(addBoosterToCollection({ email, booster: item.data.cards }))
        }
      }
    })

    dispatch(clearCart({ email }))
    setSuccess(true)

    setTimeout(() => {
      router.push("/collection")
    }, 2000)
  }

  const isFormValid = cardName && cardNumber && cardCVC

  // 🔄 Affichage de chargement temporaire
  if (isLoading || !email) return <p>Chargement...</p>

  return (
    <>
      <section className="bodyPaiement">
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
                style={{
                  opacity: isFormValid ? 1 : 0.5,
                  cursor: isFormValid ? "pointer" : "not-allowed"
                }}
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
      </section>
      <Footer />
    </>
  )
}
