import axios from "axios"

export const getAllPokemons = async () => {
  try {
    const res = await axios.get("https://pokebuildapi.fr/api/v1/pokemon")
    return res.data
  } catch (error) {
    console.error("Erreur API Pokémon:", error)
    return []
  }
}
