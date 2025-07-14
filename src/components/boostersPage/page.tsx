"use client"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { RootState } from "@/src/store"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import { generateBooster } from "@/src/lib/helpers"
import Card from "@/src/components/cardsShop/Cards"
import "./BoosterOpenPage.css"
import { useDispatch } from "react-redux"
import {
  addCardsToCollection,
  addBoosterToCollection
} from '@/src/redux/collectionSlice'

export default function BoosterOpenPage() {
  const dispatch = useDispatch()
  const pokemons = useSelector((state: RootState) => state.pokemons.data)
const [boosterAdded, setBoosterAdded] = useState(false)

  const [boosterCards, setBoosterCards] = useState<Pokemon[]>([])
  const [revealedCards, setRevealedCards] = useState<Pokemon[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemons())
    }
  }, [dispatch, pokemons])

  const handleOpenBooster = () => {
    const booster = generateBooster(pokemons)
    setBoosterCards(booster)
    setRevealedCards([])
    setCurrentIndex(0)
  }

  const handleRevealNext = () => {
    const current = boosterCards[currentIndex]
    if (!current) return
    setRevealedCards((prev) => [...prev, current])
    setCurrentIndex((prev) => prev + 1)
  }

  const currentCard = boosterCards[currentIndex]

  return (
    <div className="boosterOpenPage">
      <h1>Ouvre ton booster</h1>

      {boosterCards.length === 0 ? (
        <button onClick={handleOpenBooster} className="generateBoosterBtn">
          Ouvrir un booster
        </button>
      ) : currentCard ? (
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
                Carte {currentIndex + 1} / {boosterCards.length} – Clique pour révéler la suivante
            </p>
        </div>

      ) : (
        <p>Booster ouvert ! Toutes les cartes sont révélées.</p>
      )}

      {revealedCards.length > 0 && (
        <>
          <h2> Cartes révélées :</h2>
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
      {revealedCards.length === boosterCards.length && !boosterAdded && (
  <div style={{ marginTop: "2rem", textAlign: "center" }}>
    <button
      className="addCollectionBtn"
      onClick={() => {
        dispatch(addCardsToCollection(revealedCards))
        dispatch(addBoosterToCollection(boosterCards))
        setBoosterAdded(true)
      }}
    >
      📦 Ajouter ces cartes à ma collection
    </button>
  </div>
)}

    </div>
    
  )
}
