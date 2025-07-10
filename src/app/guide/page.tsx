import HeaderPage from "@/src/components/headerPage/HeaderPage"
import Card from "@/src/components/card/Card"
import guideBg from "@/public/assets/img/bgGuide.jpg"

export default function Guide() {
  return (
    <div className="containerGuidePage">
      <HeaderPage title="GUIDE POKEMON" backgroundImage={guideBg.src} />
      <div className="divider-main"></div>
      <div className="cardDiv">
        <Card />
      </div>
    </div>
  )
}
