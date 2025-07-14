import Card from "@/src/components/cardsShop/Cards"


type Pokemon = {
  id: number
  name: string
  image: string
  apiTypes: { name: string }[]
  rarity: number
  stats: {
    HP: number
    attack: number
    defense: number
  }
}


export default function Booster({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <div className="boosterGrid">
      {pokemons.map(p => (
        <Card
          key={p.id}
          id={p.id}
          name={p.name}
          image={p.image}
          types={p.apiTypes.map(t => t.name)}
          rarity={p.rarity}
          hp={p.stats.HP}
          attack={p.stats.attack}
          defense={p.stats.defense}
        />
      ))}
    </div>
  )
}
