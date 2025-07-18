import HeaderPage from "@/src/components/headerPage/HeaderPage"
import Card from "@/src/components/card/Card"
import Footer from "../../components/footer/Footer"

export default function Guide() {
  return (
    <div className="containerGuidePage">
      <HeaderPage
  title="Guide des cartes"
  subtitle="Tous les secrets des cartes Pokémon"
  theme="guide"
  icon="📚"
/>
      <div className="divider-main"></div>
      <div className="cardDiv">
        <Card />
      </div>
      <Footer/>
    </div>
  )
}
