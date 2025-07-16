"use client";

import type React from "react";
import { MapPin } from "lucide-react";

interface MapPoint {
  id: string;
  label: string;
  style: React.CSSProperties;
}

interface Props {
  onSelect: (id: string) => void;
}

const mapPoints: MapPoint[] = [
  {
    id: "3", // Fruit Orchard
    label: "Fruit Orchard",
    style: { top: "25%", left: "20%" },
  },
  {
    id: "6", // Reel landscape
    label: "Reel landscape",
    style: { top: "23%", left: "42%" },
  },
  {
    id: "5", // Upcycled furniture
    label: "Upcycled furniture",
    style: { top: "54%", left: "28%" },
  },
  {
    id: "2", // Water wetland
    label: "Water wetland",
    style: { top: "51%", right: "22%" },
  },
  {
    id: "4", // Dryscape land
    label: "Dryscape land",
    style: { bottom: "29%", right: "8%" },
  },
  {
    id: "1", // Meeting point
    label: "Meeting point",
    style: { bottom: "14%", left: "12%" },
  },
  {
    id: "7", // Meeting point
    label: "Solar Photobioreactor",
    style: { top: "20%", left: "57%" },
  },
];

export default function ImageMap({ onSelect }: Props) {
  return (
    <div className="relative w-full max-w-2xl mb-20 mt-5 bg-inherit mx-auto px-6">
      <img
        src="/images/map1.webp"
        alt="Interactive Garden Map"
        className="w-full rounded-xl shadow-lg"
      />
      {mapPoints.map((point) => (
        <button
          key={point.id}
          onClick={() => onSelect(point.id)}
          className="absolute flex items-center space-x-1 bg-white text-red-600 text-xs px-2 py-1 rounded-full shadow hover:bg-red-100 transition-all border border-red-300"
          style={{ ...point.style, position: "absolute" }}
        >
          <MapPin className="w-3 h-3" />
         
        </button>
      ))}
    </div>
  );
}
