"use client"

import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { RootState } from "@/src/store"
import Card from "@/src/components/cardsShop/Cards"
import "./page.css"
import {
  addCardsToCollection,
  removeBooster
} from "@/src/redux/collectionSlice"
import Link from "next/link"

export default function BoosterOpenPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const boosterIndex = parseInt(id as string)
  const booster = useSelector((state: RootState) => state.collection.boosters[boosterIndex])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [revealedCards, setRevealedCards] = useState([])
  const [boosterAdded, setBoosterAdded] = useState(false)

  if (!booster) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Booster introuvable.</p>

  const currentCard = booster[currentIndex]

  const handleRevealNext = () => {
    if (!currentCard) return
    setRevealedCards(prev => [...prev, currentCard])
    setCurrentIndex(prev => prev + 1)
  }

  const handleFinishOpening = () => {
    dispatch(addCardsToCollection(booster))
    dispatch(removeBooster(boosterIndex))
    setBoosterAdded(true)
  }

  return (
    <div className="boosterOpenPage">
      <h1>Ouvre ton booster</h1>

      {currentCard ? (
        <div className="cardRevealArea">
          <div className="card-animate">
            <Card
              id={currentCard.id}
              name={currentCard.name}
              image={currentCard.image}
              types={currentCard.apiTypes.map(t => t.name)}
              rarity={currentCard.rarity}
              hp={currentCard.stats.HP}
              attack={currentCard.stats.attack}
              defense={currentCard.stats.defense}
              onImageClick={handleRevealNext}
            />
          </div>
          <p className="clickMessage">
            Carte {currentIndex + 1} / {booster.length} - Clique sur l'image pour révéler la suivante
          </p>
        </div>
      ) : (
        !boosterAdded && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p>🎉 Booster ouvert !</p>
            <Link href="/collection"><button className="addCollectionBtn" onClick={handleFinishOpening}>
              Ajouter les cartes à ma collection
            </button></Link> 
          </div>
        )
      )}

      {revealedCards.length > 0 && (
        <>
          <h2>Cartes révélées :</h2>
          <div className="revealedCardsGrid">
            {revealedCards.map((p) => (
              <Card
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.image}
                types={p.apiTypes.map(t => t.name)}
                rarity={p.rarity}
                hp={p.stats.HP}
                attack={p.stats.attack}
                defense={p.stats.defense}
              />
            ))}
          </div>
        </>
      )}

      {boosterAdded && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>✅ Cartes ajoutées à votre collection.</p>
         <Link href="/collection"><button>Retour à la collection</button></Link> 
        </div>
      )}
    </div>
  )
}
