"use client"

import { useState } from "react"
import { MessageCircle, Star } from "lucide-react"
import { ReviewModal } from "./ReviewModal"
import { ChatbotModal } from "./ChatModal"

export function FloatingIcons() {
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [showNotificationDot, setShowNotificationDot] = useState(true) // default: show before click

  return (
    <>
      {/* Floating Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        {/* Review Icon with red dot */}
        <div className="relative">
          <button
            onClick={() => {
              setIsReviewOpen(true)
              if (showNotificationDot) setShowNotificationDot(false)
            }}
            className="bg-amber-400 hover:bg-amber-300 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Open review popup"
          >
            <Star className="w-6 h-6" />
          </button>
          {showNotificationDot && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Chatbot Icon */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="bg-green-800 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
      <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  )
}
