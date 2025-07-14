"use client"

import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { RootState, AppDispatch } from "@/src/store/index"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import Card, { getPrice } from "@/src/components/cardsShop/Cards"
import './page.css'
import HeaderPage from "@/src/components/headerPage/HeaderPage"
import bgDetail from '@/public/assets/img/bgDetail.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import LoadingPlaceholder from "./loading"

export default function CardDetail() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { data: pokemons, loading } = useSelector((state: RootState) => state.pokemons)

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemons())
    }
  }, [dispatch, pokemons.length])

  
  if (loading || pokemons.length === 0) {
    return <div><LoadingPlaceholder/></div>
  }

  const pokemon = pokemons.find((p) => p.id.toString() === id)

  if (!pokemon) {
    return <div>Pokémon introuvable.</div>
  } 

  // Évolutions suivantes
const evolutions = pokemon.apiEvolutions?.map(evo =>
  pokemons.find(p => p.id === evo.pokedexId)
).filter(Boolean) || []

// Pré-évolution
const preEvo = pokemon.apiPreEvolution
  ? pokemons.find(p => p.id === pokemon.apiPreEvolution.pokedexIdd)
  : null

const weaknesses = pokemon.apiResistances
  .filter(r => r.damage_relation === "vulnerable")
  .map(r => r.name)

const resistances = pokemon.apiResistances
  .filter(r => r.damage_relation === "resistant" || r.damage_relation === "twice_resistant")
  .map(r => r.name)

  const price = getPrice(pokemon.name, pokemon.rarity)






  return (
    <div className="cardDetailContainer">
      <HeaderPage title="QUI EST CE POKEMON ?" backgroundImage={bgDetail.src} />
            <div className="divider-main"></div>


      <div className="mainCardSection">
         <div className="cardImageBlock">
    <img className="mainCardImage" src={pokemon.image} alt={pokemon.name} />

    <button className="add-to-cart-button">Ajouter au panier</button>
  </div>

        <div className="cardDescription">
          <h2>{pokemon.name}</h2>
          <p>Type(s) : {pokemon.apiTypes.map(t => t.name).join(", ")}</p>
          <p>Génération : {pokemon.apiGeneration}</p>
          <p>HP : {pokemon.stats.HP}</p>
          <p>Attaque : {pokemon.stats.attack}</p>
          <p>Défense : {pokemon.stats.defense}</p>
          <p>Rareté : {pokemon.rarity}</p>
          <p>Prix : {price.toLocaleString()}€ </p>

          <div className="strengths-weaknesses">
            <h4>Type Défensif</h4>
            <table className="type-table">
              <thead>
                <tr>
                  <th>Faiblesses</th>
                  <th>Résistances</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{weaknesses.join(", ") || "Aucune"}</td>
                  <td>{resistances.join(", ") || "Aucune"}</td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
      </div>

      <div className="relatedCardsSection">
  <h3>Cartes liées</h3>

  <div className="evolutionRow">
    {preEvo && (
      <div className="evolutionBlock">
        <h4>Pré-évolution</h4>
        <div className="relatedCardsGrid">
          <Card
            key={preEvo.id}
            id={preEvo.id}
            name={preEvo.name}
            image={preEvo.image}
            types={preEvo.apiTypes.map((t) => t.name)}
            rarity={preEvo.rarity}
            hp={preEvo.stats.HP}
            attack={preEvo.stats.attack}
            defense={preEvo.stats.defense}
          />
        </div>
      </div>
    )}

    {evolutions.length > 0 && (
      <div className="evolutionBlock">
        <h4>Évolutions</h4>
        <div className="relatedCardsGrid">
          {evolutions.map((evo) => (
            <Card
              key={evo.id}
              id={evo.id}
              name={evo.name}
              image={evo.image}
              types={evo.apiTypes.map((t) => t.name)}
              rarity={evo.rarity}
              hp={evo.stats.HP}
              attack={evo.stats.attack}
              defense={evo.stats.defense}
            />
          ))}
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  )
}
