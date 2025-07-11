"use client"

import HeaderPage from "@/src/components/headerPage/HeaderPage"
import shopBg from '@/public/assets/img/bgHeaderShop.png'
import logoEtincelles from "@/public/assets/img/logoLumiere.png"
import card1 from "@/public/assets/img/lumiereBooster.jpg"
import card2 from "@/public/assets/img/arceus.png"
import logoRocket from '@/public/assets/img/team-rocket-returns.png'
import Card from "@/src/components/cardsShop/Cards"
import PikachuLoading from '@/public/assets/img/pikachuGif.gif'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import { RootState, AppDispatch } from "@/src/store/index"
import FilterBar from "@/src/components/filterBar/FIlterBar"

export default function Shop() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: originalPokemons, loading: isLoading } = useSelector((state: RootState) => state.pokemons)

  const [filteredPokemons, setFilteredPokemons] = useState(originalPokemons)

  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<"asc" | "desc" | null>(null)
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null)

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
              <img src={logoRocket.src} alt="Logo Rocket" className="rocketLogo1" />
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
          setPokemons={() => {}} // <- non utilisé ici
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
              {filteredPokemons.map((pokemon) => (
                <Card
                  key={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.apiTypes.map((t) => t.name)}
                  rarity={pokemon.rarity}
                  id={pokemon.id}
                  hp={pokemon.hp}
                  attack={pokemon.attack}
                  defense={pokemon.defense}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  )
}
