import React from "react";
import { useLanguage } from "./language-provider";
function Header() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center p-[10%]"
      style={{ backgroundImage: "url('/images/bg-eco.jpg')" }}
    >
      {/* Blurred left half */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full backdrop-blur-sm bg-black/30" />
        <div className="w-1/2 h-full" />
      </div>

      {/* Joined seamless text effect */}
      <div className="absolute inset-0 items-center flex flex-col justify-center bottom-[10%]">
        <div className="text-white mb-4 text-base sm:text-lg md:text-xl text-[19px]">
          <p>{t("mini-desc")}</p>
        </div>
        <div className="relative flex">
          {/* Left (transparent text on blur side) */}
          <span className="text-[7.5vw] font-extrabold text-transparent bg-[url('/images/bg-eco.jpg')] bg-right bg-clip-text">
            {t("left-heading")}&nbsp;
          </span>

          {/* Right (white text on clear side) */}
          <span className="text-[7.5vw] font-extrabold text-gray-300">
            {t("right-heading")}
          </span>
        </div>
      </div>

      {/* Paragraph on the blurred left side */}
      <div className="absolute top-[58%] left-4 sm:left-16 max-w-[90%] sm:max-w-md text-white text-sm md:text-lg lg:text-xl leading-relaxed text-center md:text-left">
        <p>{t("description")}</p>
      </div>
    
    </div>
  );
}

export default Header;