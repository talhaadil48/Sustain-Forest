"use client"
import { Mail, PhoneCall, MapPin } from "lucide-react"
import { useLanguage } from "./LanguageProvider."
export default function Footer() {
    const { language, setLanguage, t } = useLanguage()
    return (
      <footer className="relative py-6 px-4 bg-white text-black overflow-hidden">
        {/* Overlay + Blur */}
        <div className="absolute inset-0 bg-black/40  dark:bg-black/60 backdrop-blur-md z-0" />
  
        {/* Layout Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          
          {/* Left Section: Logo or Name */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-black">{t("footer_h")}</h2>
            <p className="text-sm">{t("footer_p")}</p>
          </div>
  
          {/* Center Section: Copyright */}
          <div className="text-center text-xs text-gray-300">
            © {new Date().getFullYear()} Eco Centric. All rights reserved.
          </div>
  
          {/* Right Section: Contact Info */}
          <div className="text-center md:text-right text-sm space-y-1">
            <div className="flex space-x-2 items-center">
            <Mail className="h-5 w-5" />
            <p className="text-md mb-2">ecocentric@example.com</p>
          </div>
          <div className="flex space-x-2 items-center">
            <PhoneCall className="h-5 w-5" />
            <p className="text-md mb-2">+92 3001010101</p>
          </div>
          <div className="flex space-x-2 items-center">
            <MapPin className="h-5 w-5" />
            <p className="text-md mb-2">NED University, Karachi</p>
          </div>
          </div>
        </div>
      </footer>
    );
  }
  