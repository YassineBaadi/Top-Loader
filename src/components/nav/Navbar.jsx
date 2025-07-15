'use client'

import Link from 'next/link'
import './navbar.css'
import Logo from './../../../public/assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faGear } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Modal from '../modal/Modal'
import LoginForm from '../../features/auth/LoginForm'
import RegisterForm from '../../features/auth/RegisterForm'

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (path) => pathname === path

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [user, setUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) setUser(JSON.parse(stored))
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="navbarContainer">
      <div className="logo">
        <img src={Logo.src} alt="Logo" style={{ width: 200, height: 180 }} />
      </div>

      <div className="navbarSettings">
        <ul className="containerList">
          <li>
            <Link href="/home" className={isActive('/') ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link href="/collection" className={isActive('/collection') ? 'active' : ''}>Collection</Link>
          </li>
          <li>
            <Link href="/shop" className={isActive('/shop') ? 'active' : ''}>Shop</Link>
          </li>
          <li>
            <Link href="/attrapez-les-tous" className={isActive('/attrapez-les-tous') ? 'active' : ''}>
              Attrapez les tous
            </Link>
          </li>

          <li ref={dropdownRef} style={{ position: "relative" }}>
            {user ? (
              <>
                <button
                  onClick={() => setShowDropdown(prev => !prev)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  <FontAwesomeIcon icon={faUser} /> {user.email}
                </button>

                {showDropdown && (
                  <div style={{
                    position: "absolute",
                    top: "2.5rem",
                    right: 0,
                    background: "#fff",
                    color: "#333",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "0.5rem",
                    zIndex: 1000,
                    minWidth: "160px",
                    textAlign: "left"
                  }}>
                    <button
                      onClick={() => {
                        localStorage.removeItem("currentUser")
                        setUser(null)
                        setShowDropdown(false)
                        window.location.reload()
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#333",
                        cursor: "pointer",
                        width: "100%",
                        padding: "0.5rem"
                      }}
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                <FontAwesomeIcon icon={faUser} size="lg" />
              </button>
            )}
          </li>

          <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
            <>
              <LoginForm />
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Pas encore de compte ?{" "}
                <span
                  style={{ color: "#3498db", cursor: "pointer" }}
                  onClick={() => {
                    setShowLoginModal(false)
                    setShowRegisterModal(true)
                  }}
                >
                  S’inscrire
                </span>
              </p>
            </>
          </Modal>

          <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
            <RegisterForm />
          </Modal>

          <li>
            <Link href="/cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
          </li>
          <li>
            <Link href="/settings"><FontAwesomeIcon icon={faGear} /></Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
