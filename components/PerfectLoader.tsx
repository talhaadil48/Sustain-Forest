"use client"

import type React from "react"
import { Trees } from "lucide-react"
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
        setProgress(10)

        // Phase 2: Wait for fonts
        setLoadingPhase("Loading fonts...")
        await waitForFonts()
        if (!mounted) return
        setProgress(20)

        // Phase 3: Wait for images
        setLoadingPhase("Loading images...")
        await waitForAllImages()
        if (!mounted) return
        setProgress(60)

        // Phase 4: Wait for rendering to complete
        setLoadingPhase("Rendering content...")
        await waitForRendering()
        if (!mounted) return
        setProgress(80)

        // Phase 5: Wait for visual completion
        setLoadingPhase("Finalizing visuals...")
        await waitForVisualCompletion()
        if (!mounted) return
        setProgress(95)

        // Phase 6: Final buffer
        setLoadingPhase("Perfect!")
        await new Promise((resolve) => setTimeout(resolve, 500))
        if (!mounted) return
        setProgress(100)

        // Phase 7: Complete with fade preparation
        setLoadingPhase("Complete!")
        await new Promise((resolve) => setTimeout(resolve, 200))
        if (mounted) {
          setLoading(false)
        }
      } catch (error) {
        console.error("Loading error:", error)
        if (mounted) {
          // Fallback after error
          setTimeout(() => setLoading(false), 1000)
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
          document.fonts.ready.then(() => {
            // Additional wait for font rendering
            setTimeout(() => resolve(), 100)
          })
        } else {
          setTimeout(() => resolve(), 200)
        }
      })
    }

    const waitForAllImages = () => {
      return new Promise<void>((resolve) => {
        const images = Array.from(document.querySelectorAll("img"))
        if (images.length === 0) {
          setTotalImages(0)
          setLoadedImages(0)
          resolve()
          return
        }

        setTotalImages(images.length)
        let loadedCount = 0

        const updateProgress = () => {
          setLoadedImages(loadedCount)
          const imageProgress = (loadedCount / images.length) * 40 // 40% of total progress for images
          setProgress(20 + imageProgress)
        }

        const handleImageLoad = () => {
          loadedCount++
          updateProgress()
          if (loadedCount === images.length) {
            // Wait a bit more after all images are loaded
            setTimeout(() => resolve(), 200)
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
        }, 15000) // 15 second timeout
      })
    }

    const waitForRendering = () => {
      return new Promise<void>((resolve) => {
        // Wait for multiple animation frames to ensure rendering is complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve()
            })
          })
        })
      })
    }

    const waitForVisualCompletion = () => {
      return new Promise<void>((resolve) => {
        // Check if all elements are properly rendered and visible
        const checkVisibility = () => {
          const images = Array.from(document.querySelectorAll("img"))
          const allVisible = images.every((img) => {
            const rect = img.getBoundingClientRect()
            return img.complete && rect.width > 0 && rect.height > 0
          })

          if (allVisible || images.length === 0) {
            // Additional wait for any CSS animations or transitions
            setTimeout(() => resolve(), 300)
          } else {
            // Check again after a short delay
            setTimeout(checkVisibility, 100)
          }
        }

        checkVisibility()
      })
    }

    // Start loading process with a small initial delay
    setTimeout(() => {
      checkAllResourcesLoaded()
    }, 100)

    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <>
        <style jsx global>{`
          @keyframes forestFloat {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            25% { 
              transform: translateY(-8px) rotate(1deg) scale(1.02);
            }
            50% { 
              transform: translateY(-12px) rotate(0deg) scale(1.05);
            }
            75% { 
              transform: translateY(-8px) rotate(-1deg) scale(1.02);
            }
          }
          
          @keyframes pulseRing {
            0%, 100% { 
              opacity: 0.1;
              transform: scale(1.2);
            }
            50% { 
              opacity: 0.3;
              transform: scale(1.6);
            }
          }
          
          @keyframes innerGlow {
            0% { 
              opacity: 0.2;
              transform: scale(0.9);
            }
            100% { 
              opacity: 0.4;
              transform: scale(1.1);
            }
          }
          
          @keyframes grassBounce {
            0%, 80%, 100% {
              transform: scale(0.8) translateY(0);
              opacity: 0.7;
            }
            40% {
              transform: scale(1.2) translateY(-10px);
              opacity: 1;
            }
          }
          
          @keyframes progressGrow {
            0% { width: 0%; }
            30% { width: ${progress * 0.4}%; }
            60% { width: ${progress * 0.7}%; }
            100% { width: ${progress}%; }
          }

          .forest-float {
            animation: forestFloat 4s ease-in-out infinite;
          }

          .pulse-ring {
            animation: pulseRing 3s ease-in-out infinite;
          }

          .inner-glow {
            animation: innerGlow 2.5s ease-in-out infinite alternate;
          }

          .grass-bounce-1 {
            animation: grassBounce 1.6s ease-in-out infinite;
            animation-delay: 0s;
          }

          .grass-bounce-2 {
            animation: grassBounce 1.6s ease-in-out infinite;
            animation-delay: 0.3s;
          }

          .grass-bounce-3 {
            animation: grassBounce 1.6s ease-in-out infinite;
            animation-delay: 0.6s;
          }

          .progress-grow {
            animation: progressGrow 3s ease-out infinite;
          }
        `}</style>

        <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-lime-100 via-green-50 to-emerald-100 p-4 relative overflow-hidden z-50">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-lime-300 rounded-full blur-3xl" />
            <div className="absolute bottom-32 right-16 w-40 h-40 bg-green-200 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-200 rounded-full blur-2xl" />
          </div>

          {/* Main loader container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated forest logo with enhanced effects */}
            <div className="relative mb-8">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full pulse-ring"
                style={{
                  background:
                    "radial-gradient(circle, rgba(132, 204, 22, 0.2) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 80%)",
                  transform: "scale(1.5)",
                }}
              />

              {/* Logo with floating animation */}
              <div className="relative z-10 forest-float">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gradient-to-br from-lime-400 to-green-600 rounded-full flex items-center justify-center drop-shadow-lg">
                  <Trees className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white" />
                </div>
              </div>

              {/* Inner glow effect */}
              <div
                className="absolute inset-0 rounded-full inner-glow"
                style={{
                  background: "radial-gradient(circle, rgba(163, 230, 53, 0.3) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Enhanced loading text */}
            <div className="text-center mb-6">
              <p className="text-lime-700 text-xl sm:text-2xl font-semibold mb-2 animate-pulse">Growing Forest</p>
              <p className="text-green-600 text-sm sm:text-base font-medium opacity-80">{loadingPhase}</p>
            </div>

            {/* Stylized progress indicator */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-lime-500 rounded-full shadow-lg grass-bounce-1" />
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg grass-bounce-2" />
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg grass-bounce-3" />
            </div>

            {/* Progress bar */}
            <div className="w-48 sm:w-64 h-1.5 bg-lime-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* Progress text */}
            <div className="mt-4 text-center">
              <p className="text-green-600 text-sm font-medium">{progress}% Complete</p>
              {totalImages > 0 && (
                <p className="text-green-500 text-xs mt-1">
                  Images: {loadedImages}/{totalImages}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return <>{children}</>
}
