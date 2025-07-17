"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLocalLogin = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return alert("Identifiants invalides.")
    localStorage.setItem("currentUser", JSON.stringify(user))
    window.location.reload()
  }

  return (
    <div className="modalAuthContainer">
      <h2>Connexion</h2>
      <form onSubmit={handleLocalLogin}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <p>ou</p>
        <button onClick={() => signIn("google")} className="oauth-btn">Se connecter avec Google</button>
        <button onClick={() => signIn("github")} className="oauth-btn">Se connecter avec GitHub</button>
      </div>
    </div>
  )
}