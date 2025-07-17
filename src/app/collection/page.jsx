"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeaderPage from "@/src/components/headerPage/HeaderPage"
import Card from "@/src/components/cardsShop/Cards"
import FilterBar from "@/src/components/filterBar/FIlterBar"
import Link from "next/link"
import './page.css'
import Footer from "../../components/footer/Footer"
import { selectUserCollection, loadUserCollection } from "@/src/redux/collectionSlice"
import useCurrentUser from '../../lib/helpers'

export default function CollectionPage() {
  const { user, isLoading } = useCurrentUser()
  const router = useRouter()
  const dispatch = useDispatch()

  const email = user?.email ?? null
  const { cards: purchasedCards, boosters: purchasedBoosters } = useSelector(state =>
    selectUserCollection(state, email)
  )

  const [selectedType, setSelectedType] = useState(null)
  const [selectedGeneration, setSelectedGeneration] = useState(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState(null)
  const [selectedRarity, setSelectedRarity] = useState(null)
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user])

  useEffect(() => {
    if (email) {
      dispatch(loadUserCollection({ email }))
    }
  }, [email, dispatch])

  useEffect(() => {
    let result = purchasedCards.filter(p => p && Array.isArray(p.apiTypes))

    if (selectedType) {
      result = result.filter(p =>
        p.apiTypes.some(t => t?.name?.toLowerCase() === selectedType.toLowerCase())
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

    setFiltered(result)
  }, [purchasedCards, selectedType, selectedGeneration, search, sort, selectedRarity])

  if (isLoading || !user) {
    return <div>Chargement...</div>
  }

  const validFiltered = filtered.filter(card =>
    card &&
    card.id &&
    card.stats &&
    Array.isArray(card.apiTypes)
  )

  const grouped = validFiltered.reduce((acc, card) => {
    if (acc[card.id]) {
      acc[card.id].count++
    } else {
      acc[card.id] = { card, count: 1 }
    }
    return acc
  }, {})

  const groupedValues = Object.values(grouped)
  const validGroupedValues = groupedValues.filter(({ card }) =>
    card && card.stats && Array.isArray(card.apiTypes)
  )

  const totalCollectionPrice = validGroupedValues.reduce((sum, { card, count }) => {
    return sum + (card.price || 0) * count
  }, 0)

  return (
    <div className="collectionContainer">
      <HeaderPage
        title="Collection"
        subtitle="Découvrez plus de 900 Pokémon"
        theme="collection"
        icon="🎴"
      />
      <div className="divider-main"></div>

      <section className="collectionCards">
        <h2>Boosters achetés</h2>
        <div className="pokemonGrid">
          {purchasedBoosters.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              Aucun booster acheté pour le moment.
            </p>
          ) : (
            purchasedBoosters.map((booster, boosterIndex) => (
              <div key={boosterIndex} className="pokemonCard">
                <h3>Booster #{boosterIndex + 1}</h3>
                <img
                  src={booster.image || "/assets/img/boosterRocket.png"}
                  alt="Booster"
                  style={{ width: "100%", objectFit: "contain" }}
                />
                <h4>({booster.length} cartes)</h4>
                <Link href={`/boosterPage/${boosterIndex}`}>
                  <button>Ouvrir</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="divider-main secondDivider"></div>

      <section className="collectionCards">
        <h2 className="h2Collection">Cartes collectionnées</h2>

        <FilterBar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedGeneration={selectedGeneration}
          setSelectedGeneration={setSelectedGeneration}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          originalPokemons={purchasedCards}
          setPokemons={setFiltered}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
        />

        <div className="collection-total-price">
          💰 Valeur totale de la collection : <strong>{totalCollectionPrice.toLocaleString()} €</strong>
        </div>

        <div className="pokemonGrid">
          {validGroupedValues.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              Aucune carte dans votre collection.
            </p>
          ) : (
            validGroupedValues.map(({ card, count }) => (
              <div key={card.id} style={{ position: "relative" }}>
                <Card
                  id={card.id}
                  name={card.name}
                  image={card.image}
                  types={(card.apiTypes || []).map(t => t.name)}
                  rarity={card.rarity ?? 1}
                  hp={card.stats?.HP ?? 0}
                  attack={card.stats?.attack ?? 0}
                  defense={card.stats?.defense ?? 0}
                />
                {count > 1 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      fontSize: "0.9rem"
                    }}
                  >
                    x{count}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </section>
      <Footer/>
    </div>
  )
}