"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import './page.css'
import Footer from "../../components/footer/Footer"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const exists = users.find(u => u.email === email)

    if (exists) {
      alert("Un compte avec cet email existe déjà.")
      return
    }

    users.push({ email, password })
    localStorage.setItem("users", JSON.stringify(users))

    alert("Inscription réussie !")
    window.location.href = "/login"

  }

  return (
    <>
    <div className="authContainer">
      <h2>Créer un compte</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">S'inscrire</button>
        
      </form>
      <p style={{ marginTop: "1rem" }}>
        Déjà inscrit ? <a href="/login">Se connecter</a>
      </p>
    </div>
    <Footer/>
    </>
  )
}
