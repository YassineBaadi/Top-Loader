"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCardsToCollection } from "@/src/redux/collectionSlice"
import { generateRarity } from "@/src/components/cardsShop/Cards"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import { useRouter } from "next/navigation"
import LoadingPlaceholder from "../carte/[id]/loading"
import './page.css'
import HeaderPage from "../../components/headerPage/HeaderPage"
import Footer from "../../components/footer/Footer"

export default function CatchGame() {
  const dispatch = useDispatch()
  const router = useRouter()
  const allPokemons = useSelector((state) => state.pokemons.data)

  const [pokemon, setPokemon] = useState(null)
  const [attempts, setAttempts] = useState(5)
  const [message, setMessage] = useState("")
  const [caught, setCaught] = useState(false)
  const [loading, setLoading] = useState(true)
  const [messageType, setMessageType] = useState("")
  const [nextResetTime, setNextResetTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState("")
  const [isClient, setIsClient] = useState(false);
const [user, setUser] = useState(null);

const [checkingAuth, setCheckingAuth] = useState(true); 

  

  const email = user?.email
  const gameKey = `catchGameData_${email}`
  const messageKey = `catchMessage_${email}`

 useEffect(() => {
  if (typeof window !== "undefined") {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push("/login");
    }
    setCheckingAuth(false); 
  }
}, []);



  useEffect(() => {
    if (message && (caught || attempts === 0 || messageType === "failure")) {
      const timer = setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [message, caught, attempts, messageType])

  useEffect(() => {
    if (!email) {
      router.push("/login")
      return
    }

    if (allPokemons.length === 0) {
      dispatch(fetchPokemons())
    } else {
      const stored = JSON.parse(localStorage.getItem(gameKey))
      const now = new Date()

      if (stored?.lastCatchDate) {
        const lastDate = new Date(stored.lastCatchDate)
        const nextReset = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000)
        setNextResetTime(nextReset)

        const hoursDiff = (now - lastDate) / (1000 * 60 * 60)
        if (hoursDiff < 24) {
          setPokemon(stored.pokemon)
          setAttempts(stored.attemptsLeft)
          setCaught(stored.caught || false)

          const savedMsg = JSON.parse(localStorage.getItem(messageKey))
          if (savedMsg && (stored.caught || stored.attemptsLeft === 0)) {
            setMessage(savedMsg.text)
            setMessageType(savedMsg.type)
          }

          setLoading(false)
          return
        }
      }

      setTimeout(() => {
        spawnNewPokemon()
        setLoading(false)
      }, 1000)
    }
  }, [allPokemons])

  useEffect(() => {
    if (!nextResetTime) return

    const interval = setInterval(() => {
      const now = new Date()
      const diff = nextResetTime - now

      if (diff <= 0) {
        clearInterval(interval)
        spawnNewPokemon()
        return
      }

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0')
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0')
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0')

      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [nextResetTime])

  function spawnNewPokemon() {
    const base = allPokemons[Math.floor(Math.random() * allPokemons.length)]
    const newPokemon = {
      ...base,
      rarity: generateRarity(base)
    }

    const now = new Date()
    const nextReset = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    setPokemon(newPokemon)
    setAttempts(5)
    setCaught(false)
    setMessage("Cliquez sur le Pokémon ou utilisez la Pokéball pour l'attraper !")
    setMessageType("")
    setNextResetTime(nextReset)

    localStorage.setItem(gameKey, JSON.stringify({
      pokemon: newPokemon,
      attemptsLeft: 5,
      lastCatchDate: now.toISOString(),
      caught: false
    }))
    localStorage.removeItem(messageKey)
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

  function attemptCatch() {
    if (attempts === 0 || caught) return

    const chance = getCatchChance(pokemon.rarity)
    const success = Math.random() <= chance
    const newAttempts = attempts - 1
    setAttempts(newAttempts)

    const msgText = success
      ? `🎉 ${pokemon.name} attrapé ! Ajouté à votre collection !`
      : newAttempts === 0
        ? `😞 ${pokemon.name} s'est échappé ! Plus de Pokéballs...`
        : `❌ ${pokemon.name} a évité la Pokéball ! Essayez encore !`

    const msgType = success ? "success" : "failure"

   if (success) {
  dispatch(addCardsToCollection({ email, cards: pokemon }))
  setCaught(true)
}
    setMessage(msgText)
    setMessageType(msgType)

    localStorage.setItem(gameKey, JSON.stringify({
      pokemon,
      attemptsLeft: newAttempts,
      lastCatchDate: new Date().toISOString(),
      caught: success
    }))

    localStorage.setItem(messageKey, JSON.stringify({
      text: msgText,
      type: msgType
    }))
  }

  function renderPokeballs() {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className={`pokeball ${i >= attempts ? 'used' : ''}`} />
    ))
  }

  function getRarityStars(rarity) {
    return '⭐'.repeat(rarity)
  }

  function getRarityColor(rarity) {
    switch (rarity) {
      case 1: return '#9E9E9E'
      case 2: return '#4CAF50'
      case 3: return '#2196F3'
      case 4: return '#9C27B0'
      case 5: return '#FF9800'
      default: return '#9E9E9E'
    }
  }
  
if (checkingAuth) {
  return <LoadingPlaceholder />;
}



  return (
    <>
    <div className="body">
      <HeaderPage
        title="Attrapez-les tous"
        subtitle="Tentez de capturer un pokémon"
        theme="catch"
        icon="⚡"
      />
      <div className="divider-main"></div>
      <div className="clouds">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
      </div>

      <div className="game-container">
        <div className="game-screen">
          <h1 className="title">Attrapez-les tous !</h1>

          <button className="collection-btn" onClick={() => router.push("/collection")}>
             Collection
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
                <div className="pokeball-display">{renderPokeballs()}</div>
              </div>

              <div className="countdown">
                ⏳ Prochain Pokémon dans : <strong>{timeLeft}</strong>
              </div>

              <button
                className="catch-button"
                onClick={attemptCatch}
                disabled={attempts === 0 || caught}
              >
                 Lancer Pokéball
              </button>

              <div className={`message ${messageType}`}>{message}</div>

              {(caught || attempts === 0) && (
                <div className="final-actions">
                  <button
                    className="final-button"
                    onClick={() => router.push("/collection")}
                  >
                     Voir ma collection
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  )
}
