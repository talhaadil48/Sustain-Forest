"use client"

import { useLanguage } from "../components/language-provider"
import { LanguageSwitcher } from "../components/language-switcher"

export default function Page() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-gray-900">{t("welcome")}</h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">{t("description")}</p>

          <LanguageSwitcher />

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{t("title")}</h2>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
