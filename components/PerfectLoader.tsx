"use client"

import type React from "react"

import { Trees, Leaf, Mountain } from "lucide-react"
import { useEffect, useState } from "react"

interface PerfectLoaderProps {
  children: React.ReactNode
}

export default function PerfectLoader({ children }: PerfectLoaderProps) {
  const [loading, setLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState(0)
  const [totalImages, setTotalImages] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState("Initializing...")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true

    const checkAllResourcesLoaded = async () => {
      if (!mounted) return

      try {
        // Phase 1: Wait for document ready
        setLoadingPhase("Preparing content...")
        await waitForDocumentReady()

        if (!mounted) return

        // Phase 2: Wait for fonts
        setLoadingPhase("Loading fonts...")
        await waitForFonts()
        setProgress(20)

        if (!mounted) return

        // Phase 3: Wait for images
        setLoadingPhase("Loading images...")
        await waitForAllImages()

        if (!mounted) return

        // Phase 4: Wait for any remaining resources
        setLoadingPhase("Finalizing...")
        await new Promise((resolve) => setTimeout(resolve, 500))
        setProgress(100)

        if (!mounted) return

        // Phase 5: Complete
        setLoadingPhase("Complete!")
        await new Promise((resolve) => setTimeout(resolve, 300))

        if (mounted) {
          setLoading(false)
        }
      } catch (error) {
        console.error("Loading error:", error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    const waitForDocumentReady = () => {
      return new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve()
        } else {
          const handleLoad = () => {
            document.removeEventListener("DOMContentLoaded", handleLoad)
            window.removeEventListener("load", handleLoad)
            resolve()
          }
          document.addEventListener("DOMContentLoaded", handleLoad)
          window.addEventListener("load", handleLoad)
        }
      })
    }

    const waitForFonts = () => {
      return new Promise<void>((resolve) => {
        if ("fonts" in document) {
          document.fonts.ready.then(() => resolve())
        } else {
          setTimeout(() => resolve(), 100)
        }
      })
    }

    const waitForAllImages = () => {
      return new Promise<void>((resolve) => {
        const images = Array.from(document.querySelectorAll("img"))

        if (images.length === 0) {
          setTotalImages(0)
          setLoadedImages(0)
          setProgress(80)
          resolve()
          return
        }

        setTotalImages(images.length)
        let loadedCount = 0

        const updateProgress = () => {
          setLoadedImages(loadedCount)
          const imageProgress = (loadedCount / images.length) * 60 // 60% of total progress for images
          setProgress(20 + imageProgress) // Start from 20% (after fonts)
        }

        const handleImageLoad = () => {
          loadedCount++
          updateProgress()

          if (loadedCount === images.length) {
            resolve()
          }
        }

        images.forEach((img) => {
          if (img.complete && img.naturalHeight !== 0) {
            handleImageLoad()
          } else {
            img.addEventListener("load", handleImageLoad, { once: true })
            img.addEventListener("error", handleImageLoad, { once: true })

            // Force reload if image src is set but not loading
            if (img.src && !img.complete) {
              const src = img.src
              img.src = ""
              img.src = src
            }
          }
        })

        // Fallback timeout
        setTimeout(() => {
          if (loadedCount < images.length) {
            console.warn(`${images.length - loadedCount} images failed to load`)
            resolve()
          }
        }, 10000) // 10 second timeout
      })
    }

    // Start loading process
    checkAllResourcesLoaded()

    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-green-50 via-[#cdf5bc] to-[#aeee91] relative overflow-hidden">
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
            <div className="relative">
              <Trees className="w-20 h-20 text-emerald-900 animate-pulse" />
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

          {/* Progress bar with real progress */}
          <div className="w-64 h-3 bg-emerald-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-emerald-800 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress percentage */}
          <div className="text-emerald-800 text-sm font-medium mb-4">{Math.round(progress)}%</div>

          {/* Loading phase text */}
          <div className="text-center mb-4">
            <p className="text-emerald-700 text-xl font-semibold mb-2">{loadingPhase}</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-emerald-700 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Image loading progress */}
          {totalImages > 0 && (
            <div className="text-center text-emerald-600 text-sm">
              <p>
                {loadedImages} of {totalImages} images loaded
              </p>
            </div>
          )}

          {/* Forest sounds indicator */}
          <div className="mt-6 flex items-center space-x-2 text-emerald-800 text-sm">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-emerald-300 rounded animate-pulse" style={{ animationDelay: "0s" }} />
              <div className="w-1 h-6 bg-green-400 rounded animate-pulse" style={{ animationDelay: "0.1s" }} />
              <div className="w-1 h-3 bg-emerald-500 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1 h-5 bg-green-600 rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="w-1 h-4 bg-emerald-700 rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="font-medium">Perfect loading in progress...</span>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
