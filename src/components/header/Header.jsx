'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cards from '@/src/components/cardsShop/Cards'
import './header.css'

import headerBg1 from '../../../public/assets/img/headerBg.jpg'
import headerBg2 from '../../../public/assets/img/headerBG2.jpg'
import teamRocket from '../../../public/assets/img/team-rocket-returns.png'
import Link from 'next/link'

const images = [headerBg1.src, headerBg2.src]

export default function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const pokemons = useSelector((state) => state.pokemons.data)

  const mewtwo = pokemons.find(p => p.name.toLowerCase() === 'mewtwo')

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
        <Link href='/collection'><button className="button">MA COLLECTION</button></Link>
        <Link href='/shop'><button className="button">DETAILS DU BOOSTER</button></Link>
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
        {mewtwo ? (
          <Cards
            id={mewtwo.id}
            name={mewtwo.name}
            image={mewtwo.image}
            types={mewtwo.apiTypes.map(t => t.name)}
            rarity={mewtwo.rarity}
            hp={mewtwo.stats.HP}
            attack={mewtwo.stats.attack}
            defense={mewtwo.stats.defense}
          />
        ) : (
          <p style={{ color: 'white' }}>Chargement de Mewtwo...</p>
        )}
      </div>
    </div>
  )
}
