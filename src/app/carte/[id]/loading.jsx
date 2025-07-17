// components/LoadingPlaceholder.tsx
import React from 'react'
import './page.css'
import PikachuGif from '@/public/assets/img/pikachuGif.gif'
import Footer from '@/src/components/footer/Footer'

export default function LoadingPlaceholder() {
  return (
    <>
    
    <div className="loadingPlaceholder">
      <img src={PikachuGif.src} alt="Chargement..." className="loadingGif" />
      <p>Chargement des données Pokémon...</p>
    </div>
    <Footer/>
    </>
  )
}
