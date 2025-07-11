import './cards.css'

type CardProps = {
  id: number
  name: string
  image: string
  types: string[]
  rarity: number
  hp : number
  attack : number
  defense : number
}


function getPrice(name: string, rarity: number): number {
  const special = ["Darkrai", "Ectoplasma"]
  if (special.includes(name)) return 100000

  switch (rarity) {
    case 1: return 2
    case 2: return 10
    case 3: return 50
    case 4: return 500
    case 5: return 2000
    default: return 0
  }
}



const typePriority: Record<string, number> = {
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



export default function Cards({ id, name, image, types, rarity, hp, attack, defense }: CardProps) {
  const dominantType = [...types]
    .map((t) => t.toLowerCase())
    .sort((a, b) => (typePriority[b] || 0) - (typePriority[a] || 0))[0]

  const sortedTypes = [...types].sort(
    (a, b) =>
      (typePriority[b.toLowerCase()] || 0) -
      (typePriority[a.toLowerCase()] || 0)
  )

  const price = getPrice(name, rarity)

  return (
    <div className="card-wrapper">
      {/* LA CARTE VISUELLE */}
      <div className={`pokemon-card-container type-${dominantType}`}>
        <div className="pokemon-card">
          <div className="background">
            <img src={image} alt={name} className="image" />
          </div>
          <div className="content">
            <div className="typesContainer">
              {sortedTypes.map((type) => (
                <span className="pokemon-type" key={type}>
                  {type}
                </span>
              ))}
            </div>
            <h1 className="pokemon-name">{name}</h1>
            <div className="pokemon-stats">
              <p>Vie : {hp} </p>
              <p>Attaque : {attack} </p>
              <p>Défense : {defense} </p>
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

      {/* FOOTER EN DESSOUS */}
      <div className="card-footer">
        <span className="card-price">{price.toLocaleString()} €</span>
        <a href={`/carte/${id}`}>
          <button className="details-button">Détails</button>
        </a>
      </div>
    </div>
  )
}

