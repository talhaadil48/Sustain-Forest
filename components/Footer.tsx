"use client"
import { Mail, PhoneCall, MapPin, Leaf, TreePine, Flower2 } from "lucide-react"
import { useLanguage } from "./LanguageProvider."

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-800 overflow-hidden">
      {/* Background decorative icons */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 rotate-12">
          <Leaf className="h-16 w-16" style={{ color: "#8a603d" }} />
        </div>
        <div className="absolute top-20 right-20 -rotate-45">
          <TreePine className="h-12 w-12" style={{ color: "#7a5435" }} />
        </div>
        <div className="absolute bottom-20 left-1/4 rotate-45">
          <Flower2 className="h-14 w-14" style={{ color: "#9a6c45" }} />
        </div>
        <div className="absolute bottom-10 right-1/3 -rotate-12">
          <Leaf className="h-10 w-10" style={{ color: "#8a603d" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90">
          <Leaf className="h-20 w-20" style={{ color: "#6a482d" }} />
        </div>
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Brand */}
          <div className="text-center lg:text-left space-y-2">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative mb-2">
                <img src="/LOGONED.png" alt="Eco Centric Logo" className="w-20 sm:w-24 drop-shadow-lg" />
                <div className="absolute -top-2 -right-2">
                  <Leaf className="h-5 w-5 animate-pulse" style={{ color: "#8a603d" }} />
                </div>
              </div>
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-[#8a603d]">
                <TreePine className="h-5 w-5" />
                {t("footer_h")}
              </h2>
            </div>
            <p className="text-sm text-gray-700 leading-snug max-w-sm mx-auto lg:mx-0">
              {t("footer_p")}
            </p>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-left space-y-3">
            <h3 className="text-base sm:text-lg font-semibold flex items-center justify-center lg:justify-start gap-2 text-gray-800">
              <Flower2 className="h-4 w-4" style={{ color: "#8a603d" }} />
              Get in Touch
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 text-[#8a603d]" />
                ecocentric@example.com
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-700">
                <PhoneCall className="h-4 w-4 text-[#7a5435]" />
                +92 3001010101
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-700">
                <MapPin className="h-4 w-4 text-[#9a6c45]" />
                NED University, Karachi
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="text-center lg:text-left space-y-3 md:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold flex items-center justify-center lg:justify-start gap-2 text-gray-800">
              <Leaf className="h-4 w-4 text-[#8a603d]" />
              Our Creative Team
            </h3>

            <p className="text-sm font-medium text-gray-800 mb-1">Concept & Development: <span className="font-normal"> Dr. Atif Mustafa, Department of Environmental Engineering, NEDUET</span></p>
            <p className="text-sm font-medium text-gray-800 mb-1">Web Team: <span className="font-normal"> Dr. Majida Kazmi, Department of Computer and Information Systems Engineering, NEDUET</span></p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-500">
              {[
                "Talha Adil",
                "Manahil Adeel",
                "Shafia Arif",
                "Omar Rashid",
                "Sitwat Samara",
                "Marium Shad",
              ].map((name, idx) => (
                <div key={idx} className="flex items-center justify-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full " 
                    style={{
                      backgroundColor:
                        idx % 3 === 0
                          ? "#8a603d"
                          : idx % 3 === 1
                          ? "#7a5435"
                          : "#9a6c45",
                    }}
                  ></div>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
