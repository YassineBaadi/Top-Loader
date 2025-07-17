import { useState } from "react"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const exists = users.find(u => u.email === email)
    if (exists) return alert("Un compte existe déjà.")
    users.push({ email, password })
    localStorage.setItem("users", JSON.stringify(users))
    alert("Inscription réussie !")
    window.location.reload()
  }

  return (
    <form onSubmit={handleRegister} className="modalAuthContainer">
      <h2>Créer un compte</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">S'inscrire</button>
    </form>
  )
}