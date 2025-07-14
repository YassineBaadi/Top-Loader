

export function generateBooster(pokemons: Pokemon[]): Pokemon[] {
  const booster: Pokemon[] = []

  const common = pokemons.filter(p => p.rarity === 1 || p.rarity === 2)
  const uncommon = pokemons.filter(p => p.rarity === 3)
  const rare = pokemons.filter(p => p.rarity >= 4)

  function getRandom(arr: Pokemon[]): Pokemon {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  if (common.length >= 6) {
    for (let i = 0; i < 6; i++) booster.push(getRandom(common))
  }

  if (uncommon.length >= 3) {
    for (let i = 0; i < 3; i++) booster.push(getRandom(uncommon))
  }

  if (rare.length > 0) {
    booster.push(getRandom(rare))
  } else {
    booster.push(getRandom(common))
  }

  return booster
}
