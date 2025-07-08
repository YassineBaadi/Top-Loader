// ...importations existantes
import Image from "next/image";
import Navbar from "@/src/components/nav/Navbar";
import Header from "@/src/components/header/Header";
import InfiniteCarousel from "@/src/components/infiniteCaroussel/InfiniteCarousel";
import imgGuide from '@/public/assets/img/img-guide.png';
import TransitionLoop from '@/public/assets/img/loopPokeball.gif';
import imgShop from '@/public/assets/img/imgShopHome.png'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />

      <div className="tendanceContainer">
        <h1>Top tendance</h1>
        <InfiniteCarousel />
      </div>

      <div className="guideContainer">
        <h1>Guide de cartes</h1>
        <div className="guideDiv" style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div className="textGuide" style={{ flex: "1", minWidth: "300px" }}>
            <p>
              Que vous soyez <strong>débutant</strong>, <strong>collectionneur passionné</strong> ou <strong>joueur compétitif</strong>, cette section a été conçue pour vous accompagner pas à pas dans votre aventure.
            </p>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "1rem" }}>
              <li>🔍 Des explications claires sur les types de cartes (Pokémon, Dresseur, Énergie…)</li>
              <li>🃏 Des conseils pour débuter ou enrichir votre collection</li>
              <li>📈 Des astuces pour reconnaître les cartes rares, holographiques et éditions spéciales</li>
              <li>🎯 Des guides stratégiques pour optimiser vos decks</li>
              <li>📚 Un historique des extensions et des séries marquantes</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Plongez dans le monde fascinant des cartes Pokémon, apprenez à décrypter chaque symbole, et développez votre expertise pour devenir un véritable maître du jeu… ou de la collection !
            </p>
          </div>
          <div style={{ flex: "1", minWidth: "300px" }}>
            <img src={imgGuide.src} alt="Guide Pokémon" style={{ width: "100%", borderRadius: "12px" }} />
          </div>
          {/* <img className="transitionLoop" src={TransitionLoop.src} alt="" /> */}
        </div>
      </div>

        {/* SECTION SHOP */}
      <div className="shopHomeContainer guideContainer">

        <div className="guideDiv" style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          
          {/* Image à gauche */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <img src={imgShop.src} alt="Shop Pokémon" style={{ width: "100%", borderRadius: "12px" }} />
          </div>

          {/* Texte à droite */}
          <div className="textShop" style={{ flex: "1", minWidth: "300px" }}>
            <p>
              Découvrez notre boutique dédiée aux passionnés de cartes Pokémon, que vous soyez <strong>collectionneur</strong>, <strong>joueur</strong> ou simple curieux.
            </p>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "1rem" }}>
              <li>💳 Achetez vos cartes à l’unité pour compléter votre collection ou booster votre deck</li>
              <li>🎁 Craquez pour des boosters aléatoires, avec parfois des <strong>extensions inédites</strong></li>
              <li>✨ Sélection authentique, vérifiée et conditionnée avec soin</li>
              <li>🚚 Livraison rapide et protégée</li>
              <li>🔥 Mises à jour régulières avec des cartes rares et séries limitées</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Que la chasse aux cartes commence ! Plongez dans notre univers et trouvez la perle rare qui manque à votre collection.
            </p>
          </div>

        </div>
      </div>

      <footer>
        
      </footer>

    </div>
  );
}
