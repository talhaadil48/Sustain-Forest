"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ur"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en")
  const [messages, setMessages] = useState<any>({})

  // Load messages for current language
  const loadMessages = async (lang: Language) => {
    try {
      const messages = await import(`../messages/${lang}.json`)
      setMessages(messages.default)
    } catch (error) {
      console.error("Failed to load messages:", error)
    }
  }

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "ur"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
      loadMessages(savedLanguage)
    } else {
      loadMessages("en")
    }
  }, [])

  // Update language and save to localStorage
  const setLanguage = async (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    await loadMessages(lang)
  }

  // Translation function
  const t = (key: string): string => {
    return messages[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div>{children}</div>
    </LanguageContext.Provider>
  )
}
