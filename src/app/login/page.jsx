"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
    router.push("/home")
  }

  return (
    <div className="authContainer">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Pas encore de compte ? <a href="/register">S'inscrire</a>
      </p>
    </div>
  )
}
