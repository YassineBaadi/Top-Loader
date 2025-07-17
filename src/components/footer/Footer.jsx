"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import './footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = () => {
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Section principale */}
        <div className="footer-content">

          {/* Navigation */}
          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/home">Accueil</Link></li>
              <li><Link href="/collection">Collection</Link></li>
              <li><Link href="/shop">Boutique</Link></li>
              <li><Link href="/catchGame">Attrapez les tous</Link></li>
              <li><Link href="/guide">Guide des cartes</Link></li>
            </ul>
          </div>

          {/* Mentions légales */}
          <div className="footer-section">
            <h4 className="footer-title">Informations</h4>
            <ul className="footer-links">
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><Link href="/conditions-generales">Conditions générales</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-text">Restez informé de nos dernières arrivées</p>
            <div className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="newsletter-input"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="newsletter-button"
              >
                S'abonner
              </button>
              {subscribed && (
                <p className="newsletter-success">✓ Inscription réussie !</p>
              )}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="footer-section">
            <h4 className="footer-title">Suivez-nous</h4>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">YouTube</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2024 PokéCards. Tous droits réservés.</p>
          <p>Pokémon est une marque déposée de Nintendo/Game Freak/The Pokémon Company</p>
        </div>
      </div>
    </footer>
  )
}
