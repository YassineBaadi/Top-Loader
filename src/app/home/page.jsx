"use client"

import Image from "next/image"
import Navbar from "@/src/components/nav/Navbar"
import Header from "@/src/components/header/Header"
import InfiniteCarousel from "@/src/components/infiniteCaroussel/InfiniteCarousel"
import imgGuide from '@/public/assets/img/img-guide.png'
import imgCollection from '@/public/assets/img/img-collection.png'
import imgShop from '@/public/assets/img/imgShopHome.png'
import imgAttrapez from '@/public/assets/img/pokeball.png'
import TransitionLoop from '@/public/assets/img/loopPokeball.gif'
import Link from "next/link"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchPokemons } from "@/src/redux/pokemonSlice"
import './page.css'
import Footer from '../../components/footer/Footer'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch])

  const sections = [
    {
      id: 'shop',
      title: 'Boutique',
      description: 'Découvrez nos tous nouveaux produits',
      image: imgShop,
      link: '/shop',
      className: 'shopSection',
      imagePosition: 'left'
    },
    {
      id: 'collection',
      title: 'Collection',
      description: 'Accédez à la collection de plus de 900 pokémons',
      image: imgCollection,
      link: '/collection',
      className: 'collectionSection',
      imagePosition: 'right'
    },
    {
      id: 'catch',
      title: 'Attrapez-les tous',
      description: 'Tentez de capturer un pokémon',
      image: imgAttrapez,
      link: '/catchGame',
      className: 'catchSection',
      imagePosition: 'left'
    },
    {
      id: 'guide',
      title: 'Guide Pokémon',
      description: 'Découvrez tous les secrets des cartes',
      image: imgGuide,
      link: '/guide',
      className: 'guideSection',
      imagePosition: 'right'
    }
  ]

  return (
    <div className="homeContainer">
      <Header />
      <div className="divider-main"></div>

      <div className="tendanceContainer">
        <div className="tendance-content">
          <h1 className="h1Tendance">Top tendance</h1>
          <div className="carousel-wrapper">
            <InfiniteCarousel />
          </div>
        </div>
      </div>
      
      <div className="divider-main"></div>

      <main className="sectionHomeContainer">
        {sections.map((section, index) => (
          <section 
            key={section.id}
            className={`shop-section ${section.className}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`section-content ${section.imagePosition === 'left' ? 'content-right' : 'content-left'}`}>
              <div className="overlay-darken">
                <div className="shop-content">
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                  <Link href={section.link}>
                    <button className="shop-btn">Explorer</button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className={`section-image ${section.imagePosition === 'left' ? 'image-left' : 'image-right'}`}>
              <div className="shop-image-container">
                <div className="burst-background" />
                <img 
                  src={section.image.src} 
                  alt={section.title} 
                  className="shop-image" 
                />
              </div>
            </div>
          </section>
        ))}
      </main>
      
      <Footer/>
    </div>
  )
}