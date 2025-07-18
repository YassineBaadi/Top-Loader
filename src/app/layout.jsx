'use client'

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { Provider } from "react-redux"
import { store } from "../store/index"
import Navbar from "../components/nav/Navbar"
import Footer from "../components/footer/Footer"
import { SessionProvider } from "next-auth/react"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

import { useSession } from "next-auth/react"
import { useEffect } from "react"


function SyncSessionToLocalStorage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const existing = localStorage.getItem("currentUser")
const current = JSON.stringify({ email: session.user.email, from: "nextauth" })

      if (existing !== current) {
        localStorage.setItem("currentUser", current)
      }
    }

    // Ne pas supprimer si aucun user NextAuth actif mais un user local existe
    if (status === "unauthenticated") {
      const existing = localStorage.getItem("currentUser")
      if (existing) {
        const parsed = JSON.parse(existing)
        // Ne supprimer que si on sait que c'était un user NextAuth
        if (parsed.from === "nextauth") {
          localStorage.removeItem("currentUser")
        }
      }
    }
  }, [session, status])

  return null
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://kit.fontawesome.com/aef3aa4adb.js" 
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
        <Provider store={store}>
          
        <SyncSessionToLocalStorage />   
            <Navbar />
        {children}
        
      
        </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
