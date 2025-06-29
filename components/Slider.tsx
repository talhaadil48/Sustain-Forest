"use client"

import { useState } from "react"

interface AccordionItem {
  id: string
  backgroundImage: string
  name: string
  description: string
}

const accordionData: AccordionItem[] = [
  {
    id: "1",
    backgroundImage: "/images/Picture1.png",
    name: "Enchanted Forest",
    description:
      "A mystical woodland where ancient trees whisper secrets and sunlight dances through emerald canopies, creating a magical sanctuary for wildlife and wanderers alike.",
  },
  {
    id: "2",
    backgroundImage: "/images/Picture2.png",
    name: "Misty Mountains",
    description:
      "Towering peaks shrouded in ethereal mist, where eagles soar and adventure awaits those brave enough to explore the rugged terrain and hidden valleys.",
  },
  {
    id: "3",
    backgroundImage: "/images/Picture3.png",
    name: "Crystal Lake",
    description:
      "A pristine alpine lake reflecting the sky like a mirror, surrounded by wildflowers and offering a peaceful retreat from the world's chaos.",
  },
  {
    id: "4",
    backgroundImage: "/images/Picture4.png",
    name: "Desert Oasis",
    description:
      "A hidden paradise in the vast desert, where palm trees sway and crystal-clear springs provide life-giving water to weary travelers.",
  },
  {
    id: "5",
    backgroundImage: "/images/Picture5.png",
    name: "Ocean Cliffs",
    description:
      "Dramatic coastal cliffs where powerful waves crash against ancient rocks, creating a symphony of nature's raw power and beauty.",
  },
  {
    id: "6",
    backgroundImage: "/images/Picture10.png",
    name: "Aurora Valley",
    description:
      "A magical valley where the northern lights dance across the sky, painting the ethereal greens and purples throughout the night.",
  },
]

export default function Accordion() {
  const [activeItem, setActiveItem] = useState<string>("1")
  const [hoveredMobileItem, setHoveredMobileItem] = useState<string | null>(null)

  return (
    <div className="min-h-screen py-20">
      <div className="w-full">
        {/* Desktop Full-Width Horizontal Accordion */}
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
                  {/* Title - Fixed positioning for rotated text */}
                  {activeItem === item.id ? (
                    <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-700 ease-out">
                      {item.name}
                    </h3>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3
                        className="text-lg font-bold text-white whitespace-nowrap transition-all 2000 ease-out transform -rotate-90"
                        style={{
                          transformOrigin: "center center",
                        }}
                      >
                        {item.name}
                      </h3>
                    </div>
                  )}

                  {/* Description */}
                  <div
                    className={`transition-all duration-700 ease-out ${
                      activeItem === item.id ? "opacity-100 translate-y-0 max-h-32" : "opacity-0 translate-y-6 max-h-0"
                    }`}
                  >
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg shadow-emerald-400/30" />
                  </div>
                </div>

                {/* Shine effect */}
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

        {/* Mobile Vertical Card Stack */}
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
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  hoveredMobileItem === item.id
                    ? "bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                    : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                }`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform transition-all duration-700 ease-out">
                  <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
                  {/* Description - only show on hover/touch */}
                  <div
                    className={`transition-all duration-700 ease-out ${
                      hoveredMobileItem === item.id
                        ? "opacity-100 translate-y-0 max-h-32"
                        : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg shadow-emerald-400/30" />
                  </div>
                </div>
              </div>

           
              {/* Subtle Animation on Hover */}
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
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
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
