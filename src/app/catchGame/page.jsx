"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCardsToCollection } from "@/src/redux/collectionSlice"
import { generateRarity } from "@/src/components/cardsShop/Cards"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import { useRouter } from "next/navigation"
import dresseurGame from '../../../public/assets/img/dresseurGame.gif'
import LoadingPlaceholder from "../carte/[id]/loading"
import './page.css'

export default function CatchGame() {
  const dispatch = useDispatch()
  const router = useRouter()
  const allPokemons = useSelector((state) => state.pokemons.data)
  const [pokemon, setPokemon] = useState(null)
  const [attempts, setAttempts] = useState(5)
  const [message, setMessage] = useState("")
  const [caught, setCaught] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [messageType, setMessageType] = useState("")

  useEffect(() => {
    if (allPokemons.length === 0) {
      dispatch(fetchPokemons())
    } else {
      setTimeout(() => {
        spawnPokemon()
        setLoading(false)
      }, 1000)
    }
  }, [allPokemons])

  function spawnPokemon() {
    const base = allPokemons[Math.floor(Math.random() * allPokemons.length)]
    const random = {
      ...base,
      rarity: generateRarity(base)
    }

    random.rarity = generateRarity(random)
    setPokemon(random)
    setCaught(false)
    setMessage("Cliquez sur le Pokémon ou utilisez la Pokéball pour l'attraper !")
    setMessageType("")
  }

  function getCatchChance(rarity) {
    switch (rarity) {
      case 1: return 0.8
      case 2: return 0.6
      case 3: return 0.4
      case 4: return 0.25
      case 5: return 0.1
      default: return 0.5
    }
  }

  function getRarityStars(rarity) {
    return '⭐'.repeat(rarity)
  }

  function getRarityColor(rarity) {
    switch (rarity) {
      case 1: return '#9E9E9E' // Commun - Gris
      case 2: return '#4CAF50' // Peu commun - Vert
      case 3: return '#2196F3' // Rare - Bleu
      case 4: return '#9C27B0' // Très rare - Violet
      case 5: return '#FF9800' // Légendaire - Orange
      default: return '#9E9E9E'
    }
  }

  function attemptCatch() {
    if (attempts === 0 || caught) return
    
    const chance = getCatchChance(pokemon.rarity)
    const success = Math.random() <= chance

    const newAttempts = attempts - 1
    setAttempts(newAttempts)

    if (success) {
      dispatch(addCardsToCollection(pokemon))
      setCaught(true)
      setMessage(`🎉 ${pokemon.name} attrapé ! Ajouté à votre collection !`)
      setMessageType("success")
    } else if (newAttempts === 0) {
      setMessage(`😞 ${pokemon.name} s'est échappé ! Plus de Pokéballs...`)
      setMessageType("failure")
    } else {
      setMessage(`❌ ${pokemon.name} a évité la Pokéball ! Essayez encore !`)
      setMessageType("failure")
    }
  }

  function renderPokeballs() {
    const pokeballs = []
    for (let i = 0; i < 5; i++) {
      pokeballs.push(
        <div 
          key={i} 
          className={`pokeball ${i >= attempts ? 'used' : ''}`}
        />
      )
    }
    return pokeballs
  }

  if (loading) {
    return (
<>
      
      <div className="game-container">
        <div className="game-screen">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Chargement des Pokémon...</p>
          </div>
        </div>
      </div>

      </>
    )
  }

  return (
    <>

    <div className="body">

    
      <div className="clouds">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
      </div>

      <div className="game-container">
        <div className="game-screen">
          <h1 className="title">Attrapez-les tous !</h1>
          
          <button 
            className="collection-btn" 
            onClick={() => router.push("/collection")}
          >
            🗂️ Collection
          </button>

          {pokemon && (
            <>
              <div className="battle-area">
                <div className="pokemon-container">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    className="pokemon-sprite"
                    onClick={attemptCatch}
                  />
                  
                  <div className="pokemon-info">
                    <div className="pokemon-nom">{pokemon.name}</div>
                    <div className="stats-container">
                      <div className="stat">
                        <div>Rareté</div>
                        <div 
                          className="rarity"
                          style={{ color: getRarityColor(pokemon.rarity) }}
                        >
                          {getRarityStars(pokemon.rarity)}
                        </div>
                      </div>
                      <div className="stat">
                        <div>Prix</div>
                        <div>{pokemon.price}€</div>
                      </div>
                      <div className="stat">
                        <div>Capture</div>
                        <div>{Math.round(getCatchChance(pokemon.rarity) * 100)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pokeball-counter">
                <div>Pokéballs restantes: {attempts}</div>
                <div className="pokeball-display">
                  {renderPokeballs()}
                </div>
              </div>

              <button 
                className="catch-button"
                onClick={attemptCatch}
                disabled={attempts === 0 || caught}
              >
                🎯 Lancer Pokéball
              </button>

              <div className={`message ${messageType}`}>
                {message}
              </div>

              {(caught || attempts === 0) && (
                <div className="final-actions">
                  <button 
                    className="final-button"
                    onClick={() => router.push("/collection")}
                  >
                    📋 Voir ma collection
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </>
  )
}