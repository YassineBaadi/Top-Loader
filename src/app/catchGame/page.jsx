"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addCardsToCollection } from "@/src/redux/collectionSlice"
import { generateRarity } from "@/src/components/cardsShop/Cards"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import "./page.css"
import { useRouter } from "next/navigation"
import dresseurGame from '../../../public/assets/img/dresseurGame.gif'
import LoadingPlaceholder from "../carte/[id]/loading"


export default function CatchGame() {
  const dispatch = useDispatch()
  const router = useRouter()
  const allPokemons = useSelector((state) => state.pokemons.data)
  const [pokemon, setPokemon] = useState(null)
  const [attempts, setAttempts] = useState(5)
  const [message, setMessage] = useState("")
  const [caught, setCaught] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const [loading, setLoading] = useState(true) //  État de chargement

  useEffect(() => {
    if (allPokemons.length === 0) {
      dispatch(fetchPokemons())
    } else {
      // handleGameInit()
      setTimeout(() => {
        spawnPokemon()
        setLoading(false) // ⏳ Fin du chargement simulé
      }, 1000)
    }
  }, [allPokemons])

  // function handleGameInit() {
  //   const lastTime = localStorage.getItem("lastCatchTime")
  //   const savedAttempts = localStorage.getItem("pokeballsLeft")

  //   if (lastTime) {
  //     const diff = Date.now() - parseInt(lastTime, 10)
  //     if (diff < 24 * 60 * 60 * 1000) {
  //       if (savedAttempts !== null) {
  //         setAttempts(parseInt(savedAttempts, 10))
  //       }
  //     } else {
  //       localStorage.removeItem("pokeballsLeft")
  //       localStorage.removeItem("lastCatchTime")
  //     }
  //   }

  //   if (!lastTime || Date.now() - parseInt(lastTime || 0, 10) >= 24 * 60 * 60 * 1000) {
  //     spawnPokemon()
  //   } else {
  //     // setCooldown(true)
  //   }
  // }

  function spawnPokemon() {
    const base = allPokemons[Math.floor(Math.random() * allPokemons.length)]
    const random = {
      ...base,
      rarity: generateRarity(base)
    }

    random.rarity = generateRarity(random)
    setPokemon(random)
    setCaught(false)
    setMessage("")
  }

  function getCatchChance(rarity) {
    switch (rarity) {
      case 1: return 0.5
      case 2: return 0.4
      case 3: return 0.3
      case 4: return 0.2
      default: return 0.1
    }
  }

  function attemptCatch() {
    if (attempts === 0 || caught) return
    const chance = getCatchChance(pokemon.rarity)
    const success = Math.random() <= chance

    const newAttempts = attempts - 1
    setAttempts(newAttempts)

    // localStorage.setItem("pokeballsLeft", newAttempts.toString())
    // localStorage.setItem("lastCatchTime", Date.now().toString())

    if (success) {
      dispatch(addCardsToCollection(pokemon))
      setCaught(true)
      setMessage("🎉 Pokémon attrapé !")
    } else if (newAttempts === 0) {
      setMessage("Vous avez échoué. À demain pour une nouvelle tentative.")
      // setTimeout(() => {
      //   router.push("/collection")
      // }, 5000)
    } else {
      setMessage(" Raté ! Essayez encore.")
    }
  }

  // if (cooldown) {
  //   return (
  //     <div className="catch-container">
  //       <h1>Attrapez-les tous</h1>
  //       <p>⏳ Vous avez déjà joué aujourd’hui. Revenez demain !</p>
  //       <button onClick={() => router.push("/collection")}>Voir ma collection</button>
  //     </div>
  //   )
  // }

  if (loading) {
    return (
      <div className="catch-container">
        <LoadingPlaceholder />
      </div>
    )
  }

  return (
    <div className="catch-container">
      <h1>Attrapez-les tous !</h1>
      <button className="to-collection" onClick={() => router.push("/collection")}>
        🗂 Voir ma collection
      </button>

      <div className="avatar">
        <img src="/assets/img/dresseurGame.gif" alt="Avatar" />
      </div>

      {pokemon && (
        <div className="pokemon" onClick={attemptCatch}>
          <img src={pokemon.image} alt={pokemon.name} />
          
        </div>
      )}
<h2>{pokemon.name}</h2>
          <p>Rareté : {pokemon.rarity} ⭐</p>
          <p>Prix : {pokemon.price} € </p>
          <p>Chance de capture : {getCatchChance(pokemon.rarity) * 100}%</p>
      <p>Tentatives restantes : {attempts}</p>
      <p className="message">{message}</p>

      {(caught || attempts === 0) && (
        <button onClick={() => router.push("/collection")}>Voir ma collection</button>
      )}
    </div>
  )
}
