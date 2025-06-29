"use client"

import { useState } from "react"

import { accordionData } from "@/lib/data"
export default function Accordion() {
  const [activeItem, setActiveItem] = useState<string>("1")
  const [hoveredMobileItem, setHoveredMobileItem] = useState<string | null>(null)

  return (
    
    <div className="relative min-h-screen py-20 overflow-hidden">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-lg scale-110 z-0"
        style={{ backgroundImage: "url('/images/bg-forest.jpg')" }}
        aria-hidden="true"
      />

      {/* Accordion Content */}
      <div className="relative z-10 w-full">
        {/* Desktop Accordion */}
        <div className="hidden md:block px-4">
          <div className="flex h-96 gap-2 w-full">
            {accordionData.map((item) => (
              <div
                key={item.id}
                className={`relative cursor-pointer transition-all duration-700 ease-out rounded-xl overflow-hidden ${
                  activeItem === item.id ? "flex-[4] shadow-2xl shadow-black/30" : "flex-[1] hover:flex-[1.2]"
                }`}
                onClick={() => setActiveItem(item.id)}
                style={{
                  backgroundImage: `url(${item.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-all ease-out duration-700 ${
                    activeItem === item.id
                      ? "bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                      : "bg-gradient-to-t from-black/95 via-black/70 to-black/40"
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {activeItem === item.id ? (
                    <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-700 ease-out">
                      {item.name}
                    </h3>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3
                        className="text-lg font-bold text-white whitespace-nowrap transition-all duration-2000 ease-out transform -rotate-90"
                        style={{ transformOrigin: "center center" }}
                      >
                        {item.name}
                      </h3>
                    </div>
                  )}

                  <div
                    className={`transition-all duration-700 ease-out ${
                      activeItem === item.id ? "opacity-100 translate-y-0 max-h-32" : "opacity-0 translate-y-6 max-h-0"
                    }`}
                  >
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-700 to-teal-400 rounded-full shadow-lg shadow-emerald-400/30" />
                  </div>
                </div>

                {/* Shine Effect */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    activeItem === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full animate-shine" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden px-4 space-y-6">
          {accordionData.map((item, index) => (
            <div
              key={item.id}
              className="relative w-full h-80 rounded-2xl overflow-hidden transform transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30 cursor-pointer"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredMobileItem(item.id)}
              onMouseLeave={() => setHoveredMobileItem(null)}
              onTouchStart={() => setHoveredMobileItem(item.id)}
              onTouchEnd={() => setTimeout(() => setHoveredMobileItem(null), 3000)}
            >
              <div
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  hoveredMobileItem === item.id
                    ? "bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                    : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                }`}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform transition-all duration-700 ease-out">
                  <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
                  <div
                    className={`transition-all duration-700 ease-out ${
                      hoveredMobileItem === item.id
                        ? "opacity-100 translate-y-0 max-h-32"
                        : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-700 to-teal-400 rounded-full shadow-lg shadow-emerald-400/30" />
                  </div>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  hoveredMobileItem === item.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }
        .animate-shine {
          animation: shine 1.2s ease-out;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}