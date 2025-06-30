"use client";

import Slider from "@/components/Slider";
// import { LanguageSwitcher } from "../components/language-switcher";
import Header from "@/components/Header";

export default function Page() {
  // const { t } = useLanguage();
  // 't' is currently unused; remove or use as needed

  return (
    <>
      <Header />
      {/* Bottom blur of Header */}
      <div className="relative w-full h-10 z-20 -mt-4">
        <div className="absolute inset-0 backdrop-blur-sm bg-transparent" />
      </div>

      {/* Top blur of Slider */}
      <div className="relative w-full h-10 z-20 -mb-4 overflow-x-clip">
        <div
          className="absolute inset-0 bg-center filter blur-md scale-110 z-0 bg-transparent" 
          style={{ backgroundImage: "url('/images/bg-forest.jpg')" }}
          aria-hidden="true"
        />
      </div>

      <Slider />
    </>
  );
}
