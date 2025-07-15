import { generateRarity } from "@/src/components/cardsShop/Cards"
import imgBooster from '@/public/assets/img/boosterRocket.png'

export function generateBooster(pokemons) {
  if (!pokemons || pokemons.length === 0) return []

  const booster = []

  const pokemonsWithRarity = pokemons.map((pokemon) => ({
    ...pokemon,
    rarity: pokemon.rarity || generateRarity(pokemon),
  }))

  const common = pokemonsWithRarity.filter((p) => p.rarity === 1 || p.rarity === 2)
  const uncommon = pokemonsWithRarity.filter((p) => p.rarity === 3)
  const rare = pokemonsWithRarity.filter((p) => p.rarity >= 4)

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  // Ajouter 6 cartes communes
  for (let i = 0; i < 6; i++) {
    booster.push(common.length > 0 ? getRandom(common) : getRandom(pokemonsWithRarity))
  }

  // Ajouter 3 cartes peu communes
  for (let i = 0; i < 3; i++) {
    if (uncommon.length > 0) {
      booster.push(getRandom(uncommon))
    } else if (common.length > 0) {
      booster.push(getRandom(common))
    } else {
      booster.push(getRandom(pokemonsWithRarity))
    }
  }

  // Ajouter 1 carte rare
  if (rare.length > 0) {
    booster.push(getRandom(rare))
  } else if (uncommon.length > 0) {
    booster.push(getRandom(uncommon))
  } else {
    booster.push(getRandom(common.length > 0 ? common : pokemonsWithRarity))
  }

  // Compléter jusqu'à 11 cartes
  while (booster.length < 11) {
    booster.push(common.length > 0 ? getRandom(common) : getRandom(pokemonsWithRarity))
  }

  // 🧠 Retourner un objet booster complet avec image et prix
  return {
    id: Date.now(),
    cards: booster,
    price: 10,
    image: "/assets/img/boosterRocket.png",
  }
}
