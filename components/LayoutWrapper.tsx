"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import { FloatingIcons } from "./FloatingIcons"
import UserInfoModal from "./UserModal"
interface UserInfoData {
  name: string
  gender: string
  qualification: string
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showPopup, setShowPopup] = useState(false)
  const hasRun = useRef(false)

  const isExcluded = pathname.startsWith("/admin") || pathname.startsWith("/login")

  // --- Cookie helpers using document.cookie ---
  const setCookie = (name: string, value: string, hours: number) => {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString()
   document.cookie = `${name}=${value}; expires=${expires}; path=/`
  }

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : null
  }
  // --------------------------------------------

  useEffect(() => {
    if (hasRun.current || isExcluded) return
    hasRun.current = true

    const popupFilled = getCookie("popup_filled")
    if (popupFilled) return

    const entryData = localStorage.getItem("guest_entered")
    if (entryData) {
      try {
        const parsed = JSON.parse(entryData)
        const hoursPassed = (Date.now() - parsed.timestamp) / (1000 * 60 * 60)
        if (hoursPassed < 24) return // Already inserted
      } catch {
        localStorage.removeItem("guest_entered")
        localStorage.removeItem("guest_id")
      }
    }

    setShowPopup(true)
  }, [pathname, isExcluded])

  const handleFormSubmit = async (formData: UserInfoData) => {
    try {
      const res = await fetch("/api/new-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok || !data?.id) {
        console.error("Insert failed:", data?.error || "Unknown error")
        alert("Failed to submit form. Please try again.")
        return
      }

      localStorage.setItem("guest_entered", JSON.stringify({ timestamp: Date.now() }))
      localStorage.setItem("guest_id", data.id)
      setCookie("popup_filled", "true", 3) // 3 hours

      setShowPopup(false)
    } catch (err) {
      console.error("Form submission failed:", err)
      alert("Something went wrong. Try again later.")
    }
  }

  return (
    <>
      {!isExcluded && showPopup && (
        <UserInfoModal onClose={() => {}} onSubmit={handleFormSubmit} />
      )}

      {!isExcluded && <Navbar />}

      <div className={showPopup && !isExcluded ? "pointer-events-none blur-sm select-none" : ""}>
        {children}
      </div>

      {!isExcluded && <FloatingIcons />}
    </>
  )
}
