import type React from "react"
import type { Metadata } from "next"
import { LanguageProvider } from "../components/language-provider"
import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Global i18n System",
  description: "Next.js with global internationalization",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar/>
          {children}
          </LanguageProvider>
      </body>
    </html>
  )
}
