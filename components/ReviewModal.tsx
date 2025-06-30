"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Star } from "lucide-react"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [name, setName] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName("")
      setReview("")
      setRating(0)
      setHoveredStar(0)
    }
  }, [isOpen])

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && rating > 0) {
      console.log("Review submitted:", { name, review, rating })
      // Here you would typically send to your API
      onClose()
    }
  }

  // Check if form is valid
  const isFormValid = name.trim().length > 0 && rating > 0

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#cbd5c0] rounded-2xl shadow-2xl w-full max-w-md max-h-[93vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Leave a Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500 transition-colors"
              required
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-red-900 rounded"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredStar || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Textarea */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-500 transition-colors resize-none"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isFormValid ? "bg-[#936639] hover:bg-[#c88d51] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}