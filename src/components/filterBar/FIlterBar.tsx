
"use client"
import { Dispatch, SetStateAction } from "react"
import './filterBar.css'


type FilterBarProps = {
  selectedType: string | null
  setSelectedType: Dispatch<SetStateAction<string | null>>
  selectedGeneration: string | null
  setSelectedGeneration: Dispatch<SetStateAction<string | null>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  sort: "asc" | "desc" | null
  setSort: Dispatch<SetStateAction<"asc" | "desc" | null>>
  originalPokemons: any[]
  setPokemons: Dispatch<SetStateAction<any[]>>
  setSelectedRarity: Dispatch<SetStateAction<number | null>>
  selectedRarity: number | null
}

export default function FilterBar({
  selectedType,
  setSelectedType,
  selectedGeneration,
  setSelectedGeneration,
  search,
  setSearch,
  sort,
  setSort,
  originalPokemons,
  setPokemons,
  selectedRarity,
  setSelectedRarity
}: FilterBarProps) {

  const typeFilters = [
    "Feu", "Eau", "Plante", "Électrik", "Psy", "Spectre", "Sol", "Roche", "Vol",
    "Normal", "Poison", "Fée", "Ténèbres", "Combat", "Insecte", "Dragon", "Acier", "Glace"
  ]

  const generationFilters = ["1", "2", "3", "4", "5", "6", "7", "8"]

  return (
    <section className="filtreContainer">
      <section className="filterBar">
        <button
          className={`filterBtn ${!selectedType && !selectedGeneration && !search && !sort ? "active" : ""}`}
          onClick={() => {
            setSelectedType(null)
            setSelectedGeneration(null)
            setSearch("")
            setSort(null)
            setSelectedRarity(null)
            setPokemons(originalPokemons)
          }}
        >
          All
        </button>

        <div className="dropdown">
          <button className="filterBtn">
            {selectedType || "Type"} ▾
          </button>
          <div className="dropdownContent">
            {typeFilters.map((type) => (
              <button
                key={type}
                className={selectedType === type ? "active" : ""}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button className="filterBtn">
            {selectedGeneration ? `Gen ${selectedGeneration}` : "Génération"} ▾
          </button>
          <div className="dropdownContent">
            {generationFilters.map((gen) => (
              <button
                key={gen}
                className={selectedGeneration === gen ? "active" : ""}
                onClick={() => setSelectedGeneration(gen)}
              >
                Génération {gen}
              </button>
            ))}
          </div>
        </div>

        <div className="dropdown">
          <button className="filterBtn">
            {sort === "asc" ? "A → Z" : sort === "desc" ? "Z → A" : "Trier par"} ▾
          </button>
          <div className="dropdownContent">
            <button className={sort === "asc" ? "active" : ""} onClick={() => setSort("asc")}>A → Z</button>
            <button className={sort === "desc" ? "active" : ""} onClick={() => setSort("desc")}>Z → A</button>
          </div>
        </div>

        <div className="dropdown">
          <button className="filterBtn">
            {selectedRarity ? `⭐`.repeat(selectedRarity) : "Rareté"} ▾
          </button>
          <div className="dropdownContent">
            {[1, 2, 3, 4, 5].map((rarity) => (
              <button
                key={rarity}
                className={selectedRarity === rarity ? "active" : ""}
                onClick={() => setSelectedRarity(rarity)}
              >
                {`⭐`.repeat(rarity)}
              </button>
            ))}
          </div>
        </div>

        <div className="searchContainer">
          <input
            type="text"
            placeholder="Recherche"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="clearBtn" onClick={() => setSearch("")}>×</button>
        </div>
      </section>
    </section>
  )
}
