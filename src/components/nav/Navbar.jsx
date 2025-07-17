'use client'

import Link from 'next/link'
import './navbar.css'
import Logo from './../../../public/assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Modal from '../modal/Modal'
import LoginForm from '../../features/auth/LoginForm'
import RegisterForm from '../../features/auth/RegisterForm'
import CartDrawer from "../../components/cartDrawer/CartDrawer"
import { useSelector } from "react-redux"
import { selectCartCount } from "@/src/redux/cartSlice"
import { signOut } from "next-auth/react"
import useCurrentUser from "../../lib/helpers"

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (path) => pathname === path

  const [showCart, setShowCart] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)

  const { user } = useCurrentUser()
  const cartCount = useSelector((state) => selectCartCount(state, user?.email))

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { href: '/home', label: 'Accueil' },
    { href: '/collection', label: 'Collection' },
    { href: '/shop', label: 'Boutique' },
    { href: '/catchGame', label: 'Attrapez les tous' }
    
  ]

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <Link href="/home">
              TOP-LOADER
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="navbar-menu">
            <ul className="navbar-nav">
              {navItems.map((item) => (
                <li key={item.href} className="nav-item">
                  <Link 
                    href={item.href} 
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions Desktop */}
          <div className="navbar-actions">
            {/* User */}
            <div ref={dropdownRef} className="user-dropdown">
              {user ? (
                <>
                  <button
                    onClick={() => setShowDropdown(prev => !prev)}
                    className="user-button"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="user-email">{user.email}</span>
                  </button>

                  {showDropdown && (
                    <div className="dropdown-menu">
                      <button
                        onClick={() => {
                          localStorage.removeItem("currentUser")
                          signOut()
                          setShowDropdown(false)
                        }}
                        className="dropdown-item"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="user-button"
                >
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </button>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              className="cart-button"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        >
          <div className="mobile-menu-content">
            <ul className="mobile-nav">
              {navItems.map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <Link 
                    href={item.href} 
                    className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mobile-actions">
              {user ? (
                <div className="mobile-user-info">
                  <span className="mobile-user-email">{user.email}</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem("currentUser")
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="mobile-logout-btn"
                  >
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="mobile-login-btn"
                >
                  <FontAwesomeIcon icon={faUser} /> Se connecter
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay pour mobile */}
      {isMobileMenuOpen && <div className="mobile-overlay" />}

      {/* Modals */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <>
          <LoginForm />
          <p className="modal-switch">
            Pas encore de compte ?{" "}
            <span
              className="modal-link"
              onClick={() => {
                setShowLoginModal(false)
                setShowRegisterModal(true)
              }}
            >
              S'inscrire
            </span>
          </p>
        </>
      </Modal>

      <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <RegisterForm />
      </Modal>

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  )
}