"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AccordionItem {
  id: string
  backgroundImage: string
  name: string
  description: string
  link: string
}

import { useLanguage } from "./LanguageProvider."

export default function Accordion() {
  const [activeItem, setActiveItem] = useState<string>("1")
  const [hoveredMobileItem, setHoveredMobileItem] = useState<string | null>(null)
  const router = useRouter()
  const { t } = useLanguage()

  const accordionData: AccordionItem[] = [
    {
      id: "1",
      backgroundImage: "/images/Picture2.png",
      name: t("accordion_item_1_name"),
      description: t("accordion_item_1_description"),
      link: "/meeting-area",
    },
    {
      id: "2",
      backgroundImage: "/images/Picture3.png",
      name: t("accordion_item_2_name"),
      description: t("accordion_item_2_description"),
      link: "/water-wetlands",
    },
    {
      id: "3",
      backgroundImage: "/images/Picture5.jpg",
      name: t("accordion_item_3_name"),
      description: t("accordion_item_3_description"),
      link: "/fruit-orchad",
    },
    {
      id: "4",
      backgroundImage: "/images/pic2.jpg",
      name: t("accordion_item_4_name"),
      description: t("accordion_item_4_description"),
      link: "/dryscape-plants",
    },
    {
      id: "5",
      backgroundImage: "/images/pic1.png",
      name: t("accordion_item_5_name"),
      description: t("accordion_item_5_description"),
      link: "/furniture",
    },
    {
      id: "6",
      backgroundImage: "/images/Picture11.jpg",
      name: t("accordion_item_6_name"),
      description: t("accordion_item_6_description"),
      link: "/reel-landscape",
    },
  ]

  // Handle desktop click - first click focuses, second click navigates
  const handleDesktopClick = (item: AccordionItem) => {
    if (activeItem === item.id) {
      // Second click on already active item - navigate to link
      router.push(item.link)
    } else {
      // First click - focus the item
      setActiveItem(item.id)
    }
  }

  // Handle mobile click - navigate directly
  const handleMobileClick = (item: AccordionItem) => {
    router.push(item.link)
  }

  return (
    <div className="relative min-h-screen overflow-hidden pb-10">
      {/* Blurred background layer */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-lg scale-110 z-0"
        style={{ backgroundImage: "url('/images/bg-forest.jpg')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 py-16 max-w-5xl text-center mx-auto text-white mb-9">
        <h1 className="text-5xl sm:text-4xl text-center font-bold mb-6 text-green-100">About Us</h1>
        <p className="text-base sm:text-lg leading-relaxed mb-4 drop-shadow-md">{t("about_p1")}</p>
        <p className="text-base sm:text-lg leading-relaxed mb-4 drop-shadow-md">{t("about_p2")}</p>
        <p className="text-base sm:text-lg leading-relaxed drop-shadow-md">{t("about_p3")}</p>
      </div>

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
                onClick={() => handleDesktopClick(item)}
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
                    {/* Visual indicator for second click */}
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
              onClick={() => handleMobileClick(item)}
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
