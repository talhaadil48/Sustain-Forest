"use client"

import { useLanguage } from "./language-provider"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ur" : "en"
    setLanguage(newLanguage)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm text-gray-500">{t("currentLanguage")}</p>
      <button onClick={toggleLanguage} className="bg-blue-500 text-white hover:bg-blue-600">
        {t("switchLanguage")}
      </button>
    </div>
  )
}
