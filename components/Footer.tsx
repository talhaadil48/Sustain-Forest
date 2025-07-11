"use client"
import { Mail, PhoneCall, MapPin, Leaf, TreePine, Flower2 } from "lucide-react"
import { useLanguage } from "./LanguageProvider."

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-800 overflow-hidden">
      {/* Medium brown nature background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 transform rotate-12">
          <Leaf className="h-16 w-16" style={{ color: "#8a603d" }} />
        </div>
        <div className="absolute top-20 right-20 transform -rotate-45">
          <TreePine className="h-12 w-12" style={{ color: "#7a5435" }} />
        </div>
        <div className="absolute bottom-20 left-1/4 transform rotate-45">
          <Flower2 className="h-14 w-14" style={{ color: "#9a6c45" }} />
        </div>
        <div className="absolute bottom-10 right-1/3 transform -rotate-12">
          <Leaf className="h-10 w-10" style={{ color: "#8a603d" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90">
          <Leaf className="h-20 w-20" style={{ color: "#6a482d" }} />
        </div>
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="text-center lg:text-left space-y-4">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative mb-4">
                <img src="/LOGONED.png" alt="Eco Centric Logo" className="w-24 h-auto sm:w-28 drop-shadow-lg" />
                <div className="absolute -top-2 -right-2">
                  <Leaf className="h-6 w-6 animate-pulse" style={{ color: "#8a603d" }} />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: "#8a603d" }}>
                <TreePine className="h-6 w-6" />
                {t("footer_h")}
              </h2>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
              {t("footer_p")}
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center lg:text-left space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center justify-center lg:justify-start gap-2">
              <Flower2 className="h-5 w-5" style={{ color: "#8a603d" }} />
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3 group hover:transform hover:scale-105 transition-all duration-200">
                <div
                  className="flex-shrink-0 p-3 rounded-full border-2 group-hover:shadow-lg transition-all"
                  style={{ backgroundColor: "#8a603d20", borderColor: "#8a603d60" }}
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#8a603d" }} />
                </div>
                <span className="text-sm sm:text-base text-gray-700">ecocentric@example.com</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-3 group hover:transform hover:scale-105 transition-all duration-200">
                <div
                  className="flex-shrink-0 p-3 rounded-full border-2 group-hover:shadow-lg transition-all"
                  style={{ backgroundColor: "#7a543520", borderColor: "#7a543560" }}
                >
                  <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#7a5435" }} />
                </div>
                <span className="text-sm sm:text-base text-gray-700">+92 3001010101</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-3 group hover:transform hover:scale-105 transition-all duration-200">
                <div
                  className="flex-shrink-0 p-3 rounded-full border-2 group-hover:shadow-lg transition-all"
                  style={{ backgroundColor: "#9a6c4520", borderColor: "#9a6c4560" }}
                >
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#9a6c45" }} />
                </div>
                <span className="text-sm sm:text-base text-gray-700">NED University, Karachi</span>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center lg:text-left space-y-6 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center justify-center lg:justify-start gap-2">
              <Leaf className="h-5 w-5" style={{ color: "#8a603d" }} />
              Our Creative Team
            </h3>

            {/* Concept & Development */}
            <div
              className="p-4 rounded-xl border-2 backdrop-blur-sm shadow-lg"
              style={{ backgroundColor: "#8a603d15", borderColor: "#8a603d40" }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <TreePine className="h-4 w-4" style={{ color: "#8a603d" }} />
                <p className="text-xs sm:text-sm font-medium" style={{ color: "#8a603d" }}>
                  Concept & Development
                </p>
              </div>
              <p className="font-semibold text-gray-800">Atif Mustafa</p>
            </div>

            {/* Web Development Team */}
            <div
              className="p-4 rounded-xl border-2 backdrop-blur-sm shadow-lg"
              style={{ backgroundColor: "#7a543515", borderColor: "#7a543540" }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <Flower2 className="h-4 w-4" style={{ color: "#7a5435" }} />
                <p className="text-xs sm:text-sm font-medium" style={{ color: "#7a5435" }}>
                  Web Development Team
                </p>
              </div>
              <p className="font-semibold text-gray-800 mb-3">Majida Kazmi and Team</p>

              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: "#8a603d" }}></div>
                    <span className="text-gray-700">Talha Adil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: "#7a5435" }}></div>
                    <span className="text-gray-700">Manahil Adeel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: "#9a6c45" }}></div>
                    <span className="text-gray-700">Shafia Arif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: "#8a603d" }}></div>
                    <span className="text-gray-700">Omar Rashid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: "#7a5435" }}></div>
                    <span className="text-gray-700">Sitwat Samara</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: "#9a6c45" }}></div>
                    <span className="text-gray-700">Marium Shad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
      
      </div>

      {/* Medium brown bottom border */}
    
    </footer>
  )
}
