"use client"

import { useEffect, useRef } from "react"
import Slider from "@/components/Slider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"; 

export default function Page() {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const entryData = localStorage.getItem("guest_entered")

    if (entryData) {
      try {
        const parsed = JSON.parse(entryData)
        const hoursPassed = (Date.now() - parsed.timestamp) / (1000 * 60 * 60)

        if (hoursPassed < 24) {
          return // Guest already inserted within last 24 hours
        }
      } catch {
        // If data is malformed, reset storage
        localStorage.removeItem("guest_entered")
        localStorage.removeItem("guest_id")
      }
    }

    // Insert guest via API
    fetch("/api/new-user", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          localStorage.setItem(
            "guest_entered",
            JSON.stringify({
              value: true,
              timestamp: Date.now(),
            })
          )
          localStorage.setItem("guest_id", data.id)
          console.log("ENTERED")
        }
      })
      .catch((err) => {
        console.error("Guest insert failed", err)
      })
  }, [])

  return (
    <>
      <Header />
      <Slider />
      <Footer/>
    </>
  )
}
