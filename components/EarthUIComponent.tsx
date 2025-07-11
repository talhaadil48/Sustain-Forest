"use client"
import { useState } from "react"

interface EarthSegment {
  id: string
  image: string
  title?: string
  description?: string
  color: string
}

interface EarthUIProps {
  segments?: EarthSegment[]
}

const defaultSegments: EarthSegment[] = [
  {
    id: "water",
    image: "/placeholder.svg?height=40&width=40",
    //   title: "Water Conservation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
    color: "#4A90E2",
  },
  {
    id: "energy",
    image: "/placeholder.svg?height=40&width=40",
    //   title: "Clean Energy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
    color: "#F5A623",
  },
  {
    id: "recycling",
    image: "/ned.webp?height=40&width=40",
    //   title: "Recycling",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
    color: "#7ED321",
  },
  {
    id: "forest",
    image: "/map.webp?height=40&width=40",
    // title: "Forest Protection",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
    color: "#8CC152",
  },
]

export default function EarthUIComponent({ segments = defaultSegments }: EarthUIProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  const limitedSegments = segments.slice(0, 4)
  const segmentCount = limitedSegments.length
  const angleStep = 360 / segmentCount

  const getSegmentPosition = (index: number, radius = 160) => {
    const angle = (index * angleStep - 90) * (Math.PI / 180)
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y }
  }

  return (
    <div className="earth-ui-container">
      <div className="earth-ui-wrapper">
        <div className="earth-center">
          <div className="earth-globe">
            <svg width="140" height="140" viewBox="0 0 140 140" className="earth-svg">
              <defs>
                <radialGradient id="earthGradient" cx="0.3" cy="0.3">
                  <stop offset="0%" stopColor="#9ACD32" />
                  <stop offset="40%" stopColor="#7CB342" />
                  <stop offset="70%" stopColor="#558B2F" />
                  <stop offset="100%" stopColor="#33691E" />
                </radialGradient>
              </defs>
              <circle cx="70" cy="70" r="60" fill="url(#earthGradient)" />
              <path d="M30 40 Q40 30 50 40 Q60 35 70 45 Q75 40 80 50 Q85 45 90 55 L85 65 Q80 70 75 65 Q70 70 60 65 Q50 70 40 65 Q30 60 30 50 Z" fill="#2E7D32" opacity="0.9" />
              <path d="M35 80 Q45 75 55 85 Q65 80 75 90 Q80 85 85 95 L80 100 Q70 105 60 100 Q50 105 40 100 Q30 95 35 85 Z" fill="#2E7D32" opacity="0.9" />
              <path d="M80 30 Q90 25 100 35 Q105 30 110 40 L105 50 Q95 55 85 50 Q80 45 80 35 Z" fill="#2E7D32" opacity="0.9" />
            </svg>
          </div>
          <div className="earth-orbit"></div>
        </div>

        {limitedSegments.map((segment, index) => {
          const segmentPos = getSegmentPosition(index)
          const isHovered = hoveredSegment === segment.id

          return (
            <div key={segment.id}>
              <svg
                className="connection-line"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
                width="400"
                height="400"
                viewBox="0 0 400 400"
              >
                <path
                  d={`M 200 200 Q ${200 + segmentPos.x * 0.7} ${200 + segmentPos.y * 0.7} ${200 + segmentPos.x} ${200 + segmentPos.y}`}
                  stroke="#ddd"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${segmentPos.x}px), calc(-50% + ${segmentPos.y}px))`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  zIndex: 5,
                }}
              >
                <div
                  className={`segment ${isHovered ? "hovered" : ""}`}
                  style={{ backgroundColor: segment.color }}
                  onMouseEnter={() => setHoveredSegment(segment.id)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <img src={segment.image} alt={segment.id} className="segment-image" />
                </div>
                {(segment.title || segment.description) && (
                  <div className="segment-text">
                    <h3 className="segment-title">{segment.title}</h3>
                    <p className="segment-description">{segment.description}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .earth-ui-container {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .earth-ui-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 1025px) {
          .earth-ui-wrapper {
            max-width: 60vw;
            max-height: 60vw;
          }
        }

        @media (max-width: 1024px) {
          .earth-ui-wrapper {
            max-width: 900px;
            max-height: 900px;
          }
        }

        .earth-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .earth-globe {
          position: relative;
          animation: rotate 30s linear infinite;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
        }

        .earth-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 160px;
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }

        .segment {
          width: 100px;
          height: 100px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          z-index: 5;
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .segment:hover,
        .segment.hovered {
          transform: scale(1.15);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .segment-image {
          width: 48px;
          height: 48px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          transition: transform 0.3s ease;
        }

        .segment:hover .segment-image {
          transform: scale(1.1);
        }

        .connection-line {
          opacity: 0.9;
        }

        .segment-text {
          width: 180px;
          text-align: center;
          z-index: 2;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 8px;
          padding: 0.5rem;
        }

        .segment-title {
          font-size: 1rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 0.25rem 0;
        }

        .segment-description {
          font-size: 0.85rem;
          color: #5a6c7d;
          line-height: 1.4;
          margin: 0;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .earth-ui-wrapper {
            max-width: 500px;
            max-height: 500px;
          }

          .segment {
            width: 65px;
            height: 65px;
          }

          .segment-image {
            width: 32px;
            height: 32px;
          }

          .segment-text {
            width: 140px;
            padding: 0.4rem;
          }

          .segment-title {
            font-size: 0.9rem;
          }

          .segment-description {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .earth-ui-wrapper {
            max-width: 380px;
            max-height: 380px;
          }

          .segment {
            width: 55px;
            height: 55px;
          }

          .segment-image {
            width: 28px;
            height: 28px;
          }

          .segment-text {
            width: 120px;
            padding: 0.3rem;
          }

          .segment-title {
            font-size: 0.8rem;
          }

          .segment-description {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  )
}
