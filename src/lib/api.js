import axios from "axios"

export async function fetchAllPokemon() {
  try {
    const response = await axios.get("https://pokebuildapi.fr/api/v1/pokemon")
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémon :", error)
    throw error
  }
}
