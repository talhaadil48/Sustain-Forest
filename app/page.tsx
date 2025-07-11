"use client"

import { useEffect, useRef } from "react"
import Slider from "@/components/Slider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"; 
import EarthUIComponent from "@/components/EarthUIComponent";

export default function Page() {

  return (
    <>
      <Header />
      <EarthUIComponent/>
      <Slider />
      <Footer/>
    </>
  )
}
