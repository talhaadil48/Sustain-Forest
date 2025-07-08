"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setReview("");
      setRating(0);
      setHoveredStar(0);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating > 0) {
      setIsSubmitting(true); // Start loading
      const guestId = localStorage.getItem("guest_id");

      try {
        const response = await fetch("/api/send-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: review,
            star: rating,
            userid: guestId,
          }),
        });

        const result = await response.json();
        console.log(result);
        onClose();
      } catch (error) {
        console.error("Submission failed:", error);
      } finally {
        setIsSubmitting(false); // Stop loading
      }
    }
  };

  const isFormValid = rating > 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#cbd5c0] rounded-2xl shadow-2xl w-full max-w-md max-h-[93vh] overflow-hidden animate-fade-in-scale">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
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
                      star <= (hoveredStar || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 ${
              isFormValid && !isSubmitting
                ? "bg-[#936639] hover:bg-[#c88d51] text-white"
                : "bg-[#b4b0af] text-gray-700 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
