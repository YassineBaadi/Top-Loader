"use client"
import { useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { RootState } from "@/src/store/index"

export default function CartePage() {
  const { id } = useParams()
  const pokemons = useSelector((state: RootState) => state.pokemons.data)

  const pokemon = pokemons.find(p => p.id.toString() === id)

  if (!pokemon) return <p>Chargement ou introuvable</p>

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} style={{ width: 250 }} />
      <p>HP: {pokemon.hp}</p>
      <p>Attack: {pokemon.attack}</p>
      <p>Defense: {pokemon.defense}</p>
      <p>Types: {pokemon.apiTypes.map(t => t.name).join(", ")}</p>
      <p>Rareté: {"⭐".repeat(pokemon.rarity)}</p>
    </div>
  )
}
