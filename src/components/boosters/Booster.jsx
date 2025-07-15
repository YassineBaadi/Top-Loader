import Card from "@/src/components/cardsShop/Cards"

export default function Booster({ pokemons }) {
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
