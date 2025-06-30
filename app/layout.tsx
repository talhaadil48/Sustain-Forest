import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageProvider."
import ClientLoaderWrapper from "@/components/LoaderWrapper"

export const metadata: Metadata = {
  title: "Eco Centric",
  description: "Next.js with global internationalization",
  generator: 'v0.dev',
  icons: "/eco-logo.png",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
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
          <ClientLoaderWrapper>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ClientLoaderWrapper>
        </LanguageProvider>
      </body>
    </html>
  )
}