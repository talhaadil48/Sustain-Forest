"use client"
import { useState, useRef, useEffect } from "react"
import { Mic, Square } from "lucide-react"
import { SpeechRecognition } from "@/types/speech-recognition"

interface VoiceInputProps {
  onVoiceMessage: (text: string) => void
  disabled?: boolean
}

export function VoiceInput({ onVoiceMessage, disabled = false }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const [showSentMessage, setShowSentMessage] = useState(false)

useEffect(() => {
  if (typeof window !== "undefined") {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      const recognition = recognitionRef.current

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      let resultReceived = false // track if any result is received

      recognition.onstart = () => {
        setIsRecording(true)
        resultReceived = false
      }

      recognition.onresult = (event) => {
        resultReceived = true
        const transcript = event.results[0][0].transcript
        const processedText = processVoiceInput(transcript)

        setShowSentMessage(true)
        setTimeout(() => setShowSentMessage(false), 2000)

        console.log(processedText)
        onVoiceMessage(processedText)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
        if (!resultReceived) {
          console.warn("No speech detected or message too short")
          // Optional: Send a fallback or retry
          // onVoiceMessage("No speech detected.") // or show a toast instead
        }
      }
    }
  }

  return () => {
    recognitionRef.current?.stop()
  }
}, [onVoiceMessage])


  const processVoiceInput = (transcript: string): string => {
    // Detect if the input contains Urdu words and convert to Roman Urdu
    if (containsUrdu(transcript)) {
      return convertUrduToRoman(transcript)
    }
    // If it's English, return as is
    return transcript
  }

  const containsUrdu = (text: string): boolean => {
    // Simple detection - check for common Urdu words or patterns
    const urduWords = [
      "اپ",
      "میں",
      "ہوں",
      "ہے",
      "کیا",
      "کیسے",
      "کہاں",
      "کب",
      "کیوں",
      "میرا",
      "تیرا",
      "اس کا",
      "ہمارا",
      "تمہارا",
      "ان کا",
      "اچھا",
      "برا",
      "بڑا",
      "چھوٹا",
      "نیا",
      "پرانا",
      "پانی",
      "کھانا",
      "گھر",
      "اسکول",
      "آفس",
      "دوست",
      "سلام",
      "نمسکار",
      "الوداع",
      "شکریہ",
      "معاف",
    ]

    const lowerText = text.toLowerCase()
    return urduWords.some((word) => lowerText.includes(word))
  }

  const convertUrduToRoman = (text: string): string => {
    // Basic Urdu to Roman Urdu conversion
    const urduToRomanMap: { [key: string]: string } = {
      // Common Urdu words to Roman Urdu
      آپ: "aap",
      میں: "main",
      ہوں: "hoon",
      ہے: "hai",
      کیا: "kya",
      کیسے: "kaise",
      کہاں: "kahan",
      کب: "kab",
      کیوں: "kyun",
      میرا: "mera",
      تیرا: "tera",
      "اس کا": "uska",
      ہمارا: "hamara",
      تمہارا: "tumhara",
      "ان کا": "unka",
      اچھا: "accha",
      برا: "bura",
      بڑا: "bara",
      چھوٹا: "chota",
      نیا: "naya",
      پرانا: "purana",
      پانی: "paani",
      کھانا: "khana",
      گھر: "ghar",
      اسکول: "school",
      آفس: "office",
      دوست: "dost",
      سلام: "salam",
      نمسکار: "namaste",
      الوداع: "alvida",
      شکریہ: "shukria",
      معاف: "maaf",
    }

    let romanText = text

    // Replace Urdu words with Roman equivalents
    Object.entries(urduToRomanMap).forEach(([urdu, roman]) => {
      const regex = new RegExp(urdu, "gi")
      romanText = romanText.replace(regex, roman)
    })

    // If the text is already in Roman Urdu or mixed, clean it up
    romanText = romanText
      .replace(/[^\w\s]/g, "") // Remove special characters
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim()

    return romanText
  }

  const startRecording = () => {
    if (recognitionRef.current && !isRecording && !disabled) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  if (!isSupported) {
    return null // Don't render if speech recognition is not supported
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleRecording}
        disabled={disabled}
        className={`px-4 py-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
          disabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : isRecording
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
              : "bg-green-700 hover:bg-green-800 text-white"
        }`}
        title={isRecording ? "Recording... (will send automatically)" : "Start voice recording"}
      >
        {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

     
    </div>
  )
}
