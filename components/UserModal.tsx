"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface UserInfoData {
  name: string
  gender: string
  qualification: string
}

interface UserInfoModalProps {
  onClose: () => void
  onSubmit: (data: UserInfoData) => void
}

export default function UserInfoModal({ onClose, onSubmit }: UserInfoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    qualification: "",
  })

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (!formData.name.trim() || !formData.gender || !formData.qualification) {
      alert("Please fill in all required fields.")
      return
    }

    onSubmit(formData)
  }

  const isFormValid = formData.name.trim() && formData.gender && formData.qualification

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#cbd5c0] rounded-2xl shadow-2xl w-full max-w-md max-h-[93vh] overflow-hidden animate-fade-in-scale">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Your Info</h2>
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
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              required
            />
          </div>

          {/* Gender Dropdown */}
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Qualification Dropdown */}
          <div className="space-y-2">
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
              Qualification <span className="text-red-500">*</span>
            </label>
            <select
              id="qualification"
              value={formData.qualification}
              onChange={(e) => setFormData((prev) => ({ ...prev, qualification: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              required
            >
              <option value="">Select your qualification</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="university">University</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}