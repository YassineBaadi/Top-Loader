"use client"

import HeaderPage from "@/src/components/headerPage/HeaderPage"
import shopBg from '@/public/assets/img/bgHeaderShop.avif'
import logoEtincelles from "@/public/assets/img/logoLumiere.png"
import card1 from "@/public/assets/img/boosterRocket.png"
import card2 from "@/public/assets/img/arceus.png"
import logoRocket from '@/public/assets/img/team-rocket-returns.png'
import Card from "@/src/components/cardsShop/Cards"
import PikachuLoading from '@/public/assets/img/pikachuGif.gif'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import FilterBar from "@/src/components/filterBar/FIlterBar"
import { addBoosterToCollection } from "@/src/redux/collectionSlice"
import { generateBooster } from "@/src/lib/helpers"
import { generateRarity } from "@/src/components/cardsShop/Cards"
import { addToCart } from "@/src/redux/cartSlice"

import Modal from "../../components/modal/Modal"
import LoginForm from "../../features/auth/LoginForm"

import './page.css'
import LoadingPlaceholder from "../carte/[id]/loading"



export default function Shop() {
  const dispatch = useDispatch()
  const pokemons = useSelector((state) => state.pokemons.data)

  const { data: originalPokemons, loading: isLoading } = useSelector((state) => state.pokemons)

  const [filteredPokemons, setFilteredPokemons] = useState(originalPokemons)

  const [selectedType, setSelectedType] = useState(null)
  const [selectedGeneration, setSelectedGeneration] = useState(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState(null)
  const [selectedRarity, setSelectedRarity] = useState(null)

  const [showLoginModal, setShowLoginModal] = useState(false)

const handleAddBooster = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  if (!user) {
    setShowLoginModal(true)
    return
  }

  if (pokemons.length === 0) {
    alert("Aucun Pokémon disponible.")
    return
  }

  const booster = generateBooster(pokemons)
  dispatch(addToCart({ type: "booster", data: booster }))
  alert("📦 Booster ajouté au panier !")
}


  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch])

  useEffect(() => {
    let result = [...originalPokemons]

    if (selectedType) {
      result = result.filter(p =>
        p.apiTypes.some(t => t.name.toLowerCase() === selectedType.toLowerCase())
      )
    }

    if (selectedGeneration) {
      result = result.filter(p => p.apiGeneration === Number(selectedGeneration))
    }

    if (search.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sort) {
      result.sort((a, b) =>
        sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    }

    if (selectedRarity !== null) {
      result = result.filter(p => p.rarity === selectedRarity)
    }

    setFilteredPokemons(result)
  }, [originalPokemons, selectedType, selectedGeneration, search, sort, selectedRarity])

  if (isLoading) {
    return (
      <div className="catch-container">
        <LoadingPlaceholder />
      </div>
    )
  }
            
          

  return (

    <>
    <div className="shopContainer">
      <HeaderPage title="BOUTIQUE" backgroundImage={shopBg.src} />
      <div className="divider-main"></div>

      <section className="extensionSection">
        

        <div className="rocketExtension">
          <div className="rocketContent">
            <div className="rocketImages">
              <img src={card1.src} alt="Carte 1" className="card card1 card3" />
              <img src={card2.src} alt="Carte 2" className="card card2 card4" />
            </div>
            <div className="rocketText">
              <img src={logoRocket.src} alt="Logo Rocket" className="rocketLogo1" />
              <h2 className="rocketTitle">
                Parcourez <em>les cartes</em> de l’extension<br />
                <strong>Écarlate et Violet – Rivalités Destinées</strong><br />
                <em>du JCC Pokémon.</em>
              </h2>
              <p className="rocketDescription">
                
L’extension Rivalités Destinée du JCC Pokémon met en scène des affrontements légendaires entre d’anciens rivaux et de nouveaux challengers. 
À travers ces 10 cartes exclusives, redécouvrez des Pokémon emblématiques confrontés à leur destin, 
dans une ambiance intense et stratégique où chaque choix peut changer l’issue du combat.
              </p>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button
                className="addBoosterBtn"
                onClick={handleAddBooster}
              >
                 Ajouter ce booster au panier
              </button>

            </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-main"></div>

      <section className="shopCards">
        <FilterBar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedGeneration={selectedGeneration}
          setSelectedGeneration={setSelectedGeneration}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          originalPokemons={originalPokemons}
          setPokemons={() => {}}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
        />

        <section className="pokemonGridContainer">
          {isLoading ? (
            <div className="loadingContainer">
              <img
                src={PikachuLoading.src}
                alt="Chargement..."
                style={{ width: "150px", margin: "auto" }}
              />
            </div>
          ) : (
            <div className="pokemonGrid">
              {filteredPokemons.map((pokemon) => {
  const rarity = generateRarity(pokemon)

  return (
    <Card
      key={pokemon.id}
      name={pokemon.name}
      image={pokemon.image}
      types={pokemon.apiTypes.map((t) => t.name)}
      rarity={rarity} // ← maintenant bien défini
      id={pokemon.id}
      hp={pokemon.stats.HP}
      attack={pokemon.stats.attack}
      defense={pokemon.stats.defense}
    />
  )
})}

            </div>
          )}
        </section>
      </section>
    </div>

    <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
  <LoginForm />
</Modal>

</>

  )
}
