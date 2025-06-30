"use client"

import type React from "react"

import { Trees, Leaf, Mountain } from "lucide-react"
import { useEffect, useState } from "react"

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAllContentLoaded = () => {
      // Check if document is ready
      if (document.readyState !== "complete") {
        return false
      }

      // Get all images in the document
      const images = Array.from(document.querySelectorAll("img"))

      // Check if all images are loaded
      const allImagesLoaded = images.every((img) => {
        return img.complete && img.naturalHeight !== 0
      })

      return allImagesLoaded
    }

    const handleContentLoad = () => {
      // Small delay to ensure everything is rendered
      setTimeout(() => {
        if (checkAllContentLoaded()) {
          setLoading(false)
        }
      }, 100)
    }

    const waitForImages = () => {
      const images = Array.from(document.querySelectorAll("img"))

      if (images.length === 0) {
        // No images to wait for
        handleContentLoad()
        return
      }

      let loadedCount = 0
      const totalImages = images.length

      const imageLoadHandler = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          handleContentLoad()
        }
      }

      images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          // Image already loaded
          loadedCount++
        } else {
          // Wait for image to load
          img.addEventListener("load", imageLoadHandler)
          img.addEventListener("error", imageLoadHandler) // Handle failed images
        }
      })

      // Check if all images were already loaded
      if (loadedCount === totalImages) {
        handleContentLoad()
      }
    }

    const initializeLoader = () => {
      if (document.readyState === "complete") {
        waitForImages()
      } else {
        window.addEventListener("load", waitForImages)
      }
    }

    // Start the loading process
    initializeLoader()

    // Cleanup
    return () => {
      window.removeEventListener("load", waitForImages)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-50 via-[#cdf5bc] to-[#aeee91] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <Mountain className="absolute top-10 left-10 w-20 h-20 text-emerald-900" />
          <Mountain className="absolute top-20 right-16 w-16 h-16 text-emerald-900" />
          <Trees className="absolute bottom-20 left-20 w-24 h-24 text-green-900" />
          <Trees className="absolute bottom-16 right-20 w-20 h-20 text-emerald-800" />
        </div>

        {/* Main loader content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated forest scene */}
          <div className="relative mb-8">
            {/* Main tree with pulsing effect */}
            <div className="relative">
              <Trees className="w-20 h-20 text-emerald-900 animate-pulse" />
              {/* Floating leaves */}
              <Leaf
                className="absolute -top-2 -right-2 w-4 h-4 text-green-700 animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <Leaf
                className="absolute -top-1 -left-3 w-3 h-3 text-emerald-700 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
              <Leaf
                className="absolute top-2 right-1 w-3 h-3 text-green-700 animate-bounce"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Loading bar with forest theme */}
          <div className="w-64 h-2 bg-[#357f12] rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-green-700 to-emerald-900 rounded-full animate-pulse"
              style={{
                animation: "forestGrow 3s ease-in-out infinite",
                width: "100%",
              }}
            />
          </div>

          {/* Loading text with typewriter effect */}
          <div className="text-center">
            <p className="text-emerald-700 text-xl font-semibold mb-2 animate-pulse">Loading Forest Content...</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Subtle forest sounds indicator */}
          <div className="mt-6 flex items-center space-x-2 text-emerald-800 text-sm">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-emerald-300 rounded animate-pulse" style={{ animationDelay: "0s" }} />
              <div className="w-1 h-6 bg-green-400 rounded animate-pulse" style={{ animationDelay: "0.1s" }} />
              <div className="w-1 h-3 bg-emerald-500 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1 h-5 bg-green-600 rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="w-1 h-4 bg-emerald-700 rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="font-medium">Images & content loading...</span>
          </div>
        </div>

        <style jsx>{`
          @keyframes forestGrow {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    )
  }

  return <>{children}</>
}
