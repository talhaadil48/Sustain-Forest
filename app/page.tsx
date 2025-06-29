"use client";

import Slider from "@/components/Slider";
import { useLanguage } from "../components/language-provider";
import { LanguageSwitcher } from "../components/language-switcher";
import Header from "@/components/Header";

export default function Page() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
       {/* Bottom blur of Header */}
  <div className="relative w-full h-10 z-20 -mt-4">
    <div className="absolute inset-0 backdrop-blur-sm bg-transparent" />
  </div>

  {/* Top blur of Slider */}
  <div className="relative w-full h-10 z-20 -mb-4">
    <div className="absolute inset-0 bg-center filter blur-md scale-110 z-0 bg-transparent"
        style={{ backgroundImage: "url('/images/bg-forest.jpg')" }}
        aria-hidden="true" />
  </div>


  
      <Slider/>
    </>
  );
}