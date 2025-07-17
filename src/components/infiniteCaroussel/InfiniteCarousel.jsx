'use client'

import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Cards from '@/src/components/cardsShop/Cards'
import './infiniteCarousel.css'

export default function InfiniteCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const pokemons = useSelector((state) => state.pokemons.data)

  // Générer un lot aléatoire de pokémons
  const randomPokemons = useMemo(() => {
    if (!pokemons.length) return []
    const shuffled = [...pokemons].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 20)
  }, [pokemons])

  // Répéter les cartes plusieurs fois pour la boucle infinie
  const repeatedPokemons = Array(3).fill(randomPokemons).flat()

  return (
    <div className="infinite-carousel">
      <div className={`carousel-track ${isPaused ? 'paused' : ''}`}>
        {repeatedPokemons.map((pokemon, i) => (
          <div
            key={`${pokemon.id}-${i}`}
            className="carousel-item"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Cards
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.apiTypes.map(t => t.name)}
              rarity={pokemon.rarity}
              hp={pokemon.stats.HP}
              attack={pokemon.stats.attack}
              defense={pokemon.stats.defense}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
