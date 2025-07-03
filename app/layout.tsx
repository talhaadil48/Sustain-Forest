import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider.";
import LayoutWrapper from "@/components/LayoutWrapper";
import PerfectLoader from "@/components/PerfectLoader";

// ✅ Move viewport to its own export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

// ✅ Leave metadata clean
export const metadata: Metadata = {
  title: "Eco Centric",
  description: "Next.js with global internationalization",
  generator: "v0.dev",
  icons: "/eco-logo.png",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
      <div className="page-background" aria-hidden="true" />
        <LanguageProvider>
          <LayoutWrapper>
            <PerfectLoader>
            {children}
            </PerfectLoader>
          </LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
