"use client"

import { useLanguage } from "./language-provider"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ur" : "en"
    setLanguage(newLanguage)
  }

  return (
<div className="flex flex-col items-center space-y-2">
  {/* <p className="text-md text-gray-300">{t("currentLanguage")}</p> */}
  <button
    onClick={toggleLanguage}
    className="px-4 py-2 bg-transparent text-white rounded-full hover:bg-transparent hover:text-gray-700 border border-black transition font-semibold shadow"
  >
    {t("switchLanguage")}
  </button>
</div>




  )
}
