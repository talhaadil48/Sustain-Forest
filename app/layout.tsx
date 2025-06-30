import type { Metadata, Viewport } from "next"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageProvider."
import ClientLoaderWrapper from "@/components/LoaderWrapper"
import LayoutWrapper from "@/components/LayoutWrapper"

// ✅ Move viewport to its own export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}

// ✅ Leave metadata clean
export const metadata: Metadata = {
  title: "Eco Centric",
  description: "Next.js with global internationalization",
  generator: "v0.dev",
  icons: "/eco-logo.png",
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