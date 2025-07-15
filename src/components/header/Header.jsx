'use client'

import { useEffect, useState } from 'react'
import './header.css'

import headerBg1 from '../../../public/assets/img/headerBg.jpg'
import headerBg2 from '../../../public/assets/img/headerBG2.jpg'
import cardHeader from '../../../public/assets/img/mewtwocard.webp'
import teamRocket from '../../../public/assets/img/team-rocket-returns.png'

const images = [headerBg1.src, headerBg2.src]

export default function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="headerContainer">
      <div className="leftHeader">
        <img src={teamRocket.src} alt="Team Rocket" />
        <button className="button">DETAILS DE L'EXTENSION</button>
        <button className="button">VOIR LES CARTES</button>
      </div>

      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          className="fade-image"
          style={{
            opacity: currentImageIndex === index ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 1,
          }}
        />
      ))}

      <div className="rightHeader">
        <img src={cardHeader.src} alt="Card Header" />
      </div>
    </div>
  )
}
