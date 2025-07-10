"use client"
import { useState, useRef, useEffect } from 'react'
import './card.css'
import Pikachu from '@/public/assets/img/pikachuTest.png'

type ZoomData = {
  title: string
  description: string
  coords: { top: number; left: number }
}

export default function Card(): JSX.Element {
  const [zoom, setZoom] = useState<ZoomData | null>(null)
  const [guideMode, setGuideMode] = useState<boolean>(false)

  const nameRef = useRef<HTMLHeadingElement>(null)
  const typeRef = useRef<HTMLSpanElement>(null)
  const rarityRef = useRef<HTMLDivElement>(null)
  const zoomBoxRef = useRef<HTMLDivElement>(null)

  const showZoom = (
    ref: React.RefObject<HTMLElement>,
    title: string,
    description: string
  ) => {
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

  const closeZoom = (): void => setZoom(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        zoomBoxRef.current &&
        !zoomBoxRef.current.contains(e.target as Node)
      ) {
        closeZoom()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="card-with-guide-button">
      <button
        onClick={() => setGuideMode(!guideMode)}
        className="guide-toggle-btn"
      >
        {guideMode ? 'Quitter le mode guide' : 'Mode guide'}
      </button>

      <div className="pokemon-card-container">
        <div className="pokemon-card">
          <div className="background">
            <img src={Pikachu.src} alt="Pikachu" className="image" />
          </div>

          <div className="content">
            <h1
              className={`pokemon-name ${guideMode ? 'highlight' : ''}`}
              onClick={
                guideMode
                  ? () =>
                      showZoom(
                        nameRef,
                        'Pikachu',
                        'Nom du Pokémon, utilisé pour l’identification.'
                      )
                  : undefined
              }
              ref={nameRef}
            >
              Pikachu
            </h1>

            <span
              className={`pokemon-type ${guideMode ? 'highlight' : ''}`}
              onClick={
                guideMode
                  ? () =>
                      showZoom(
                        typeRef,
                        'Type : Électrique ⚡',
                        'Le type détermine les forces et faiblesses du Pokémon.'
                      )
                  : undefined
              }
              ref={typeRef}
            >
              Electric
            </span>

            <div className="pokemon-stats">
              <p>Power : 75</p>
              <p>Power : 75</p>
            </div>

            <div
              className={`rarity ${guideMode ? 'highlight' : ''}`}
              onClick={
                guideMode
                  ? () =>
                      showZoom(
                        rarityRef,
                        'Rareté ⭐',
                        'Plus il y a d’étoiles, plus la carte est rare.'
                      )
                  : undefined
              }
              ref={rarityRef}
            >
              <span>⭐</span>
            </div>

            <h1 className="pokemon-logo">Pokémon cards</h1>
          </div>
        </div>
      </div>

      {zoom && (
        <div
          className="zoom-container"
          style={{
            top: zoom.coords.top,
            left: zoom.coords.left,
          }}
          ref={zoomBoxRef}
        >
          <div className="arrow"></div>
          <div className="zoom-box">
            <button className="close-btn" onClick={closeZoom}>
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
