"use client"
import { useLanguage } from "./LanguageProvider."
import SpeakText from "@/components/SpeakText";

function Header() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center p-[10%] overflow-hidden"
      style={{ backgroundImage: "url('/images/bg-eco.webp')" }}
    >
      {/* Blurred left half with animation */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full backdrop-blur-sm bg-black/30 animate-fade-in-scale" />
        <div className="w-1/2 h-full" />
      </div>

      {/* Joined seamless text effect with staggered animations */}
      <div className="absolute inset-0 items-center flex flex-col justify-center bottom-[10%]">
        <div className="text-white mb-4 text-base sm:text-lg md:text-xl text-[19px] animate-fade-in-up animation-delay-300">
          <div className="flex gap-3">
          <p>{t("mini-desc")}</p>
              <SpeakText textKey="mini-desc"/>
          </div>
          
             
        </div>
        <div className="relative flex">
          {/* Left (transparent text on blur side) */}
          <span className="text-[7.5vw] font-extrabold text-transparent bg-[url('/images/bg-eco.webp')] bg-right bg-clip-text animate-slide-in-left animation-delay-600">
            {t("left-heading")}&nbsp;
          </span>
          {/* Right (white text on clear side) */}
          <span className="text-[7.5vw] font-extrabold text-gray-300 animate-slide-in-right animation-delay-800">
            {t("right-heading")}
          </span>
        </div>
      </div>

      {/* Paragraph on the blurred left side with animation */}
      <div className="absolute top-[60%] left-4 sm:left-16 max-w-[90%] sm:max-w-md text-white text-sm md:text-lg lg:text-xl leading-relaxed text-center md:text-left animate-fade-in-up animation-delay-1000">
        <div className="flex gap-3">
          <p>{t("description")}</p>
          <SpeakText textKey="description"/>
        </div>
        
       
      </div>
    </div>
  )
}

export default Header
