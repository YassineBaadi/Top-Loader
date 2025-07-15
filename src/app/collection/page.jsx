"use client"

import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import HeaderPage from "@/src/components/headerPage/HeaderPage"
import Card from "@/src/components/cardsShop/Cards"
import FilterBar from "@/src/components/filterBar/FIlterBar"
import Link from "next/link"
import shopBg from "@/public/assets/img/bgHeaderShop.png"
import boosterImg from "@/public/assets/img/boosterRocket.png"

export default function CollectionPage() {
  const purchasedCards = useSelector(state => state.collection.cards)
  const purchasedBoosters = useSelector(state => state.collection.boosters)

  const [selectedType, setSelectedType] = useState(null)
  const [selectedGeneration, setSelectedGeneration] = useState(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState(null)
  const [selectedRarity, setSelectedRarity] = useState(null)
  const [filtered, setFiltered] = useState(purchasedCards)
  const router = useRouter()

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("currentUser"))
      if (!user) {
        router.push("/login")
      }
    }, [])

  // Appliquer les filtres à la collection
  useEffect(() => {
    let result = [...purchasedCards]

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

    setFiltered(result)
  }, [purchasedCards, selectedType, selectedGeneration, search, sort, selectedRarity])

  // Grouper les cartes par ID
  const grouped = filtered.reduce((acc, card) => {
    if (acc[card.id]) {
      acc[card.id].count++
    } else {
      acc[card.id] = { card, count: 1 }
    }
    return acc
  }, {})

  const groupedValues = Object.values(grouped)

  return (
    <div className="shopContainer">
      <HeaderPage title="MA COLLECTION" backgroundImage={shopBg.src} />
      <div className="divider-main"></div>

      {/* Boosters achetés */}
      <section className="shopCards">
        <h2 style={{ textAlign: "center", fontSize: "2rem", margin: "2rem 0" }}>
          Boosters achetés
        </h2>

        <div className="pokemonGrid">
          {purchasedBoosters.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              Aucun booster acheté pour le moment.
            </p>
          ) : (
            purchasedBoosters.map((booster, boosterIndex) => (
              <div key={boosterIndex} className="pokemonCard">
                <p>Booster #{boosterIndex + 1}</p>
                <img
                  src={booster.image || "/assets/img/boosterRocket.png"}
                  alt="Booster"
                  style={{ width: "100%", objectFit: "contain" }}
                />
                <p>({booster.length} cartes)</p>
                <Link href={`/boosterPage/${boosterIndex}`}>
                  <button>🎴 Ouvrir ce booster</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="divider-main"></div>

      {/* Cartes collectionnées */}
      <section className="shopCards">
        <h2 style={{ textAlign: "center", fontSize: "2rem", margin: "2rem 0" }}>
          Cartes collectionnées
        </h2>

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

        <div className="pokemonGrid">
          {groupedValues.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              Aucune carte dans votre collection.
            </p>
          ) : (
            groupedValues.map(({ card, count }) => (
              <div key={card.id} style={{ position: "relative" }}>
                <Card
                  id={card.id}
                  name={card.name}
                  image={card.image}
                  types={card.apiTypes.map(t => t.name)}
                  rarity={card.rarity}
                  hp={card.stats.HP}
                  attack={card.stats.attack}
                  defense={card.stats.defense}
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
    </div>
  )
}