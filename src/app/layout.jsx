'use client'

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { Provider } from "react-redux"
import { store } from "../store/index"
import Navbar from "../components/nav/Navbar"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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
        <Provider store={store}>
          
           
            <Navbar />
        {children}
      
        </Provider>
      </body>
    </html>
  )
}
