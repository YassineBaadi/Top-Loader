"use client"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Card from "@/src/components/cardsShop/Cards"
import {
  addCardsToCollection,
  removeBooster,
} from "@/src/redux/collectionSlice"
import "./page.css"

export default function BoosterOpenPage() {
  const dispatch = useDispatch()
  const router = useRouter()
 const { id } = useParams()
const boosterIndex = Number(id)
  
  // Vérifier si l'index est valide
  if (isNaN(boosterIndex)) {
    console.error("Index invalide:", index)
    return (
      <div className="boosterOpenPage">
        <h1>❌ Erreur</h1>
        <p>L'index du booster est invalide: {index}</p>
        <button onClick={() => router.push("/collection")}>
          Retour à la collection
        </button>
      </div>
    )
  }

  const boosters = useSelector((state) => state.collection.boosters)
  const booster = boosters[boosterIndex]

  const [revealedCards, setRevealedCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [boosterAdded, setBoosterAdded] = useState(false)

  // Debug: Afficher les informations du booster
  useEffect(() => {
    console.log("Booster Index:", boosterIndex)
    console.log("All Boosters:", boosters)
    console.log("Selected Booster:", booster)
    console.log("Booster Length:", booster?.length)
  }, [boosterIndex, boosters, booster])

  // Vérification plus précise du booster
  useEffect(() => {
    // Attendre que le state soit chargé
    if (boosters.length === 0) {
      console.log("Aucun booster trouvé, redirection...")
      router.push("/collection")
      return
    }

    // Vérifier si l'index est valide
    if (boosterIndex < 0 || boosterIndex >= boosters.length) {
      console.log("Index de booster invalide, redirection...")
      router.push("/collection")
      return
    }

    // Vérifier si le booster existe et n'est pas vide
    if (!booster || !Array.isArray(booster) || booster.length === 0) {
      console.log("Booster vide ou invalide, redirection...")
      router.push("/collection")
      return
    }

    console.log("Booster valide trouvé avec", booster.length, "cartes")
  }, [booster, boosters, boosterIndex, router])

  const currentCard = booster?.[currentIndex]

  const handleRevealNext = () => {
    if (!currentCard) return
    
    console.log("Révélation de la carte:", currentCard.name)
    setRevealedCards((prev) => [...prev, currentCard])
    setCurrentIndex((prev) => prev + 1)
  }

  const handleFinishOpening = () => {
    console.log("Ajout des cartes à la collection:", revealedCards)
    dispatch(addCardsToCollection(revealedCards))
    dispatch(removeBooster(boosterIndex))
    setBoosterAdded(true)
    
    // Redirection après 2 secondes
    setTimeout(() => {
      router.push("/collection")
    }, 2000)
  }

  // Afficher un loading si les boosters ne sont pas encore chargés
  if (boosters.length === 0) {
    return (
      <div className="boosterOpenPage">
        <h1>Ajout en cours ...</h1>
      </div>
    )
  }

  // Afficher une erreur si le booster n'existe pas
  if (!booster || !Array.isArray(booster) || booster.length === 0) {
    return (
      <div className="boosterOpenPage">
        <h1>❌ Booster non trouvé</h1>
        <p>Le booster #{boosterIndex + 1} n'existe pas ou est vide.</p>
        <button onClick={() => router.push("/collection")}>
          Retour à la collection
        </button>
      </div>
    )
  }

  return (
    <div className="boosterOpenPage">
      <h1> Ouvre ton booster #{boosterIndex + 1}</h1>

      {boosterAdded ? (
        <div style={{ textAlign: "center" }}>
          <p>  Booster ouvert et ajouté à ta collection !</p>
          <p>Redirection vers la collection...</p>
        </div>
      ) : currentCard ? (
        <div className="cardRevealArea">
          <Card
            id={currentCard.id}
            name={currentCard.name}
            image={currentCard.image}
            types={currentCard.apiTypes?.map((t) => t.name) || []}
            rarity={currentCard.rarity}
            hp={currentCard.stats?.HP || 0}
            attack={currentCard.stats?.attack || 0}
            defense={currentCard.stats?.defense || 0}
            onImageClick={handleRevealNext}
          />
          <p>
            Carte {currentIndex + 1} / {booster.length} — Clique pour révéler
          </p>
        </div>
      ) : (
        <>
          <p>🎉 Toutes les cartes ont été révélées !</p>
          {revealedCards.length === booster.length && !boosterAdded && (
            <div style={{ marginTop: "2rem" }}>
              <button
                className="addCollectionBtn"
                onClick={handleFinishOpening}
              >
                 Ajouter ces cartes à ma collection
              </button>
            </div>
          )}
        </>
      )}

      {revealedCards.length > 0 && (
        <>
          <h2> Cartes révélées ({revealedCards.length}/{booster.length}) :</h2>
          <div className="revealedCardsGrid">
            {revealedCards.map((p, i) => (
              <Card
                key={`${p.id}-${i}`}
                id={p.id}
                name={p.name}
                image={p.image}
                types={p.apiTypes?.map((t) => t.name) || []}
                rarity={p.rarity}
                hp={p.stats?.HP || 0}
                attack={p.stats?.attack || 0}
                defense={p.stats?.defense || 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}