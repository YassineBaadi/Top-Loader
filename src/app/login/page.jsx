"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import './page.css'
import Footer from "../../components/footer/Footer"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      alert("Identifiants invalides.")
      return
    }

 localStorage.setItem("currentUser", JSON.stringify(user))
router.refresh() 
window.location.href = "/home"



  }



  return (
    <>

    
    <div className="authContainer">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>

      <div className="social-login">
        
        <button className="social-button google" onClick={() => signIn('google', { callbackUrl: '/home' })}
>
          🔵 Se connecter avec Google
        </button>
        <button className="social-button github">
          🐱 Se connecter avec GitHub
        </button>
      </div>

      <p style={{ marginTop: "1rem" }}>
        Pas encore de compte ? <a href="/register">S'inscrire</a>
      </p>
    </div>
    
    <Footer/>
    </>
  )
}

