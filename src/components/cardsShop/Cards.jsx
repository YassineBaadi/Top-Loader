import './cards.css'

export function generateRarity(pokemon) {
  const legendaryPokemons = [
    "Mewtwo", "Mew", "Lugia", "Ho-Oh", "Rayquaza", "Dialga", "Palkia", "Giratina",
    "Reshiram", "Zekrom", "Kyurem", "Xerneas", "Yveltal", "Zygarde",
    "Solgaleo", "Lunala", "Necrozma", "Zacian", "Zamazenta", "Eternatus", "Darkrai"
  ]

  const isLegendary = legendaryPokemons.includes(pokemon.name)
  const isGhost = pokemon.apiTypes.some(t => t.name.toLowerCase() === "spectre")
  const isGen1 = pokemon.apiGeneration === 1
  const startsWithYorB = pokemon.name.startsWith("Y") || pokemon.name.startsWith("B")

  if (isLegendary) return 5
  if (startsWithYorB) return 4
  if (isGen1) return 3
  if (isGhost) return 2
  return 1
}

export function getPrice(name, rarity) {
  const special = ["Darkrai", "Ectoplasma"]
  if (special.includes(name)) return 1000

  switch (rarity) {
    case 1: return 0.5  
    case 2: return 1     
    case 3: return 2.5   
    case 4: return 10    
    case 5: return 100   
    default: return 0
  }
}


const typePriority = {
  plante: 15,
  feu: 15,
  eau: 15,
  electrique: 15,
  insecte: 10,
  normal: 8,
  sol: 15,
  roche: 15,
  fée: 10,
  combat: 10,
  spectre: 15,
  ténèbres: 15,
  psy: 15,
  vol: 10,
  glace: 15,
  acier: 12,
}

export default function Cards({
  id,
  name,
  image,
  types,
  rarity,
  hp,
  attack,
  defense,
  onImageClick
}) {
  const dominantType = [...types]
    .map((t) => t.toLowerCase())
    .sort((a, b) => (typePriority[b] || 0) - (typePriority[a] || 0))[0]

  const sortedTypes = [...types].sort(
    (a, b) =>
      (typePriority[b.toLowerCase()] || 0) - (typePriority[a.toLowerCase()] || 0)
  )

  const price = getPrice(name, rarity)

  return (
    <div className="card-wrapper">
      {/* CARTE VISUELLE */}
      <div className={`pokemon-card-container type-${dominantType} ${rarity === 5 ? 'legendary-aura' : ''}`}>

        <div className="pokemon-card" onClick={(e) => {
          e.stopPropagation()
          if (onImageClick) onImageClick()
        }}>
          <div className="background">
            <img src={image} alt={name} className="image" />
          </div>
          <div className="content">
            <div className="typesContainer">
              {sortedTypes.map((type) => (
                <span className={`pokemon-type type-${type.toLowerCase()}`} key={type}>
  {type}
</span>

              ))}
            </div>
            <h1 className="pokemon-name">{name}</h1>
            <div className="pokemon-stats">
              <p>Vie : {hp}</p>
              <p>Attaque : {attack}</p>
              <p>Défense : {defense}</p>
            </div>
            <div className="rarity">
              {Array.from({ length: rarity }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <h1 className="pokemon-logo">Pokémon cards</h1>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="card-footer">
        <span className="card-price">
          Prix : {price.toLocaleString()} €
        </span>
        <a href={`/carte/${id}`} target="_blank" rel="noopener noreferrer">
          <button className="details-button">Détails</button>
        </a>
      </div>
    </div>
  )
}
