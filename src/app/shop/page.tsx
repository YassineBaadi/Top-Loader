"use client"

import HeaderPage from "@/src/components/headerPage/HeaderPage"
import shopBg from '@/public/assets/img/bgHeaderShop.png'
import logoEtincelles from "@/public/assets/img/logoLumiere.png"
import card1 from "@/public/assets/img/lumiereBooster.jpg"
import card2 from "@/public/assets/img/arceus.png"
import logoRocket from '@/public/assets/img/team-rocket-returns.png'
import card3 from '@/public/assets/img/boosterRocket.png'
import card4 from '@/public/assets/img/mewtwo.png'
import Card from "@/src/components/cardsShop/Cards"


import { useEffect, useState } from "react"
import { getAllPokemons } from "@/src/lib/api"

export default function Shop() {

    

type Pokemon = {
  id: number
  name: string
  image: string
  apiTypes: { name: string }[]
}

const [pokemons, setPokemons] = useState<Pokemon[]>([])

useEffect(() => {
  const fetchData = async () => {
    const data = await getAllPokemons()
    setPokemons(data)
  }
  fetchData()
}, [])

  return (
    <div className="shopContainer">
      <HeaderPage title="BOUTIQUE" backgroundImage={shopBg.src} />

    <div className="divider-main"></div>

      <section className="extensionSection">
        <div className="rocketExtension">
            <div className="rocketContent">
                <div className="rocketText">
                <img src={logoEtincelles.src} alt="Logo Étincelles" className="rocketLogo" />
                <h2 className="rocketTitle">
                    Parcourez <em>les cartes</em> de l’extension<br />
                    <strong>Écarlate et Violet – Étincelles Déferlantes</strong><br />
                    <em>du JCC Pokémon.</em>
                </h2>
                <p className="rocketDescription">
                    L’extension <em>Écarlate et Violet – Étincelles Déferlantes</em> du JCC Pokémon met en
                    vedette les nouveaux Pokémon-ex Téracristal découverts à Alola dans une
                    ambiance tropicale et décontractée.
                </p>
                </div>

                <div className="rocketImages">
                    <img src={card1.src} alt="Carte Pikachu" className="card card1" />
                    <img src={card2.src} alt="Carte Noadkoko" className="card card2" />
                </div>
            </div>
        </div>

        <div className="rocketExtension">
            <div className="rocketContent">


                <div className="rocketImages">
                    <img src={card1.src} alt="Carte Pikachu" className="card card1 card3" />
                    <img src={card2.src} alt="Carte Noadkoko" className="card card2 card4" />
                </div>


                <div className="rocketText">
                <img src={logoRocket.src} alt="Logo Étincelles" className="rocketLogo1" />
                <h2 className="rocketTitle">
                    Parcourez <em>les cartes</em> de l’extension<br />
                    <strong>Écarlate et Violet – Étincelles Déferlantes</strong><br />
                    <em>du JCC Pokémon.</em>
                </h2>
                <p className="rocketDescription">
                    L’extension <em>Écarlate et Violet – Étincelles Déferlantes</em> du JCC Pokémon met en
                    vedette les nouveaux Pokémon-ex Téracristal découverts à Alola dans une
                    ambiance tropicale et décontractée.
                </p>
                </div>

                
            </div>
        </div>
      </section>
      <div className="divider-main"></div>

      <section className="shopCards">

        <section className="filtreContainer">
            <section className="filterBar">
            <button className="filterBtn">All</button>

            <div className="dropdown">
                <button className="filterBtn">Type ▾</button>
                <div className="dropdownContent">
                <button>Feu</button>
                <button>Plante</button>
                <button>Électrik</button>
                <button>Eau</button>
                <button>Psy</button>
                {/* Ajoute les autres types ici */}
                </div>
            </div>

            <div className="dropdown">
                <button className="filterBtn">Extension ▾</button>
                <div className="dropdownContent">
                <button>Team Rocket Returns</button>
                <button>Lumière Triomphale</button>
                </div>
            </div>

            <div className="dropdown">
                <button className="filterBtn">Trier par ▾</button>
                <div className="dropdownContent">
                <button>A → Z</button>
                <button>Z → A</button>
                </div>
            </div>

            <div className="searchContainer">
                <input type="text" placeholder="Recherche" />
                <button className="clearBtn">×</button>
            </div>

        </section>

        </section>

        <section className="pokemonGridContainer">
            <div className="pokemonGrid">
            {pokemons.map((pokemon) => (
                <Card
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.apiTypes.map((t) => t.name)}
                />
            ))}
            </div>

        </section>
        
                



        <div>

        </div>
      </section>


    </div>
  )
}
