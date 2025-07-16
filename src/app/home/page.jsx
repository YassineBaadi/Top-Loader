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


export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch])

  return (
    <div className="homeContainer">
      <Header />
      <div className="divider-main"></div>

      <div className="tendanceContainer">
        <h1 className="h1Tendance">Top tendance</h1>
        <InfiniteCarousel />
      </div>
      <div className="divider-main"></div>

      <article className="sectionHomeContainer">
        <section className="shop-section guideSection">
          <div className="overlay-darken">
            <div className="shop-content">
              <h2>Guide Pokémon</h2>
              <p>Découvrez tous les secrets des cartes</p>
              <Link href='/guide'><button className="shop-btn">Explorer</button></Link>
            </div>
          </div>
          <div className="shop-image-container">
            <div className="burst-background" />
            <img src={imgGuide.src} alt="Guide Pokémon" className="shop-image" />
          </div>
        </section>

        <section className="shop-section shopSection">
          <div className="shop-image-container">
            <div className="burst-background" />
            <img src={imgShop.src} alt="Boutique" className="shop-image" />
          </div>
          <div className="overlay-darken">
            <div className="shop-content">
              <h2>Boutique</h2>
              <p>Découvrez nos tous nouveaux produits</p>
              <button className="shop-btn">Explorer</button>
            </div>
          </div>
        </section>

        <section className="shop-section collectionSection">
          <div className="overlay-darken">
            <div className="shop-content">
              <h2>Collection</h2>
              <p>Accédez à la collection de plus de 900 pokémons</p>
              <button className="shop-btn">Explorer</button>
            </div>
          </div>
          <div className="shop-image-container">
            <div className="burst-background" />
            <img src={imgCollection.src} alt="Collection" className="shop-image" />
          </div>
        </section>

        <section className="shop-section catchSection">
          <div className="shop-image-container">
            <div className="burst-background" />
            <img src={imgAttrapez.src} alt="Attrapez-les tous" className="shop-image" />
          </div>
          <div className="overlay-darken">
            <div className="shop-content">
              <h2>Attrapez-les tous</h2>
              <p>Tentez de capturer un pokémon</p>
              <button className="shop-btn">Explorer</button>
            </div>
          </div>
        </section>
      </article>
      <footer />
    </div>
  )
}
