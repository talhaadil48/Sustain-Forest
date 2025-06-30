import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageProvider."

export const metadata: Metadata = {
  title: "Eco Centric",
  description: "Next.js with global internationalization",
    generator: 'v0.dev'
}
import LayoutWrapper from "@/components/LayoutWrapper"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
           <LayoutWrapper>
            {children}
            </LayoutWrapper>
          </LanguageProvider>
      </body>
    </html>
  )
}