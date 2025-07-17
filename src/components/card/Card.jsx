"use client"
import { useState, useRef, useEffect } from 'react'
import './card.css'
import Pikachu from '@/public/assets/img/pikachuTest.png'

export default function Card() {
  const [zoom, setZoom] = useState(null)
  const [guideMode, setGuideMode] = useState(false)

  const nameRef = useRef(null)
  const typeRef = useRef(null)
  const rarityRef = useRef(null)
  const zoomBoxRef = useRef(null)

  const showZoom = (ref, title, description) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const padding = 10

      setZoom({
        title,
        description,
        coords: {
          top: rect.top + window.scrollY + rect.height / 2 - 50,
          left: rect.left + window.scrollX + rect.width + padding,
        },
      })
    }
  }

  const closeZoom = () => setZoom(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        zoomBoxRef.current &&
        !zoomBoxRef.current.contains(e.target)
      ) {
        closeZoom()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="guide-card-with-guide-button">
      <button
        onClick={() => setGuideMode(!guideMode)}
        className="guide-guide-toggle-btn"
      >
        {guideMode ? 'Quitter le mode guide' : 'Mode guide'}
      </button>

      <div className="guide-pokemon-card-container">
        <div className="guide-pokemon-card">
          <div className="guide-background">
            <img src={Pikachu.src} alt="Pikachu" className="guide-image" />
          </div>

          <div className="guide-content">
            <h1
              className={`guide-pokemon-name ${guideMode ? 'guide-highlight' : ''}`}
              onClick={
                guideMode
                  ? () => showZoom(nameRef, 'Pikachu', 'Nom du Pokémon, utilisé pour l’identification.')
                  : undefined
              }
              ref={nameRef}
            >
              Pikachu
            </h1>

            <span
              className={`guide-pokemon-type ${guideMode ? 'guide-highlight' : ''}`}
              onClick={
                guideMode
                  ? () => showZoom(typeRef, 'Type : Électrique ⚡', 'Le type détermine les forces et faiblesses du Pokémon.')
                  : undefined
              }
              ref={typeRef}
            >
              Electric
            </span>

            <div className="guide-pokemon-stats">
              <p>Power : 75</p>
              <p>Power : 75</p>
            </div>

            <div
              className={`guide-rarity ${guideMode ? 'guide-highlight' : ''}`}
              onClick={
                guideMode
                  ? () => showZoom(rarityRef, 'Rareté ⭐', 'Plus il y a d’étoiles, plus la carte est rare.')
                  : undefined
              }
              ref={rarityRef}
            >
              <span>⭐</span>
            </div>

            <h1 className="guide-pokemon-logo">Pokémon cards</h1>
          </div>
        </div>
      </div>

      {zoom && (
        <div
          className="guide-zoom-container"
          style={{
            top: zoom.coords.top,
            left: zoom.coords.left,
          }}
          ref={zoomBoxRef}
        >
          <div className="guide-arrow"></div>
          <div className="guide-zoom-box">
            <button className="guide-close-btn" onClick={closeZoom}>
              ✕
            </button>
            <h2>{zoom.title}</h2>
            <p>{zoom.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
