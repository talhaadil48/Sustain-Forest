"use client"
import { Trees, Leaf, Mountain } from "lucide-react"

import { useEffect, useState } from "react"

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
    
      setTimeout(() => setLoading(false), 1000)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => window.removeEventListener("load", handleLoad)

  }, [])

 if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-emerald-50 via-green-100 to-emerald-200 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <Mountain className="absolute top-10 left-10 w-20 h-20 text-emerald-800" />
          <Mountain className="absolute top-20 right-16 w-16 h-16 text-emerald-700" />
          <Trees className="absolute bottom-20 left-20 w-24 h-24 text-green-800" />
          <Trees className="absolute bottom-16 right-20 w-20 h-20 text-emerald-800" />
        </div>

        {/* Main loader content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated forest scene */}
          <div className="relative mb-8">
            {/* Main tree with pulsing effect */}
            <div className="relative">
              <Trees className="w-20 h-20 text-emerald-600 animate-pulse" />
              {/* Floating leaves */}
              <Leaf
                className="absolute -top-2 -right-2 w-4 h-4 text-green-500 animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <Leaf
                className="absolute -top-1 -left-3 w-3 h-3 text-emerald-400 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
              <Leaf
                className="absolute top-2 right-1 w-3 h-3 text-green-400 animate-bounce"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Loading bar with forest theme */}
          <div className="w-64 h-2 bg-emerald-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse"
              style={{
                animation: "forestGrow 3s ease-in-out infinite",
                width: "100%",
              }}
            />
          </div>

          {/* Loading text with typewriter effect */}
          <div className="text-center">
            <p className="text-emerald-700 text-xl font-semibold mb-2 animate-pulse">Entering the Forest...</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Subtle forest sounds indicator */}
          <div className="mt-6 flex items-center space-x-2 text-emerald-600 text-sm">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-emerald-400 rounded animate-pulse" style={{ animationDelay: "0s" }} />
              <div className="w-1 h-6 bg-green-400 rounded animate-pulse" style={{ animationDelay: "0.1s" }} />
              <div className="w-1 h-3 bg-emerald-500 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1 h-5 bg-green-500 rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="w-1 h-4 bg-emerald-400 rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="font-medium">Nature sounds loading...</span>
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
if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-emerald-50 via-green-100 to-emerald-200 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <Mountain className="absolute top-10 left-10 w-20 h-20 text-emerald-800" />
          <Mountain className="absolute top-20 right-16 w-16 h-16 text-emerald-700" />
          <Trees className="absolute bottom-20 left-20 w-24 h-24 text-green-800" />
          <Trees className="absolute bottom-16 right-20 w-20 h-20 text-emerald-800" />
        </div>

        {/* Main loader content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated forest scene */}
          <div className="relative mb-8">
            {/* Main tree with pulsing effect */}
            <div className="relative">
              <Trees className="w-20 h-20 text-emerald-600 animate-pulse" />
              {/* Floating leaves */}
              <Leaf
                className="absolute -top-2 -right-2 w-4 h-4 text-green-500 animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <Leaf
                className="absolute -top-1 -left-3 w-3 h-3 text-emerald-400 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
              <Leaf
                className="absolute top-2 right-1 w-3 h-3 text-green-400 animate-bounce"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Loading bar with forest theme */}
          <div className="w-64 h-2 bg-emerald-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse"
              style={{
                animation: "forestGrow 3s ease-in-out infinite",
                width: "100%",
              }}
            />
          </div>

          {/* Loading text with typewriter effect */}
          <div className="text-center">
            <p className="text-emerald-700 text-xl font-semibold mb-2 animate-pulse">Entering the Forest...</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Subtle forest sounds indicator */}
          <div className="mt-6 flex items-center space-x-2 text-emerald-600 text-sm">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-emerald-400 rounded animate-pulse" style={{ animationDelay: "0s" }} />
              <div className="w-1 h-6 bg-green-400 rounded animate-pulse" style={{ animationDelay: "0.1s" }} />
              <div className="w-1 h-3 bg-emerald-500 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1 h-5 bg-green-500 rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="w-1 h-4 bg-emerald-400 rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="font-medium">Nature sounds loading...</span>
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




