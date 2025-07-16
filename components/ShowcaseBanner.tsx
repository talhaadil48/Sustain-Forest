"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider.";
import SpeakText from "./SpeakText";

interface ShowcaseBannerProps {
  descriptions: string[];
  images: string[];
  title: string;
  titleDesription: string;
  audios: string;
  logoImages?: (null | string[])[]; // Optional prop for logo images
}

export default function ShowcaseBanner({
  descriptions,
  images,
  title,
  titleDesription,
  audios,
  logoImages = [],
}: ShowcaseBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    blocksRef.current.forEach((block) => {
      if (block) observer.observe(block);
    });

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    setTimeout(() => setIsVisible(true), 100);

    return () => observer.disconnect();
  }, []);

  const blockTitles = [
    t("section_how_we_made_it"),
    t("section_about_it"),
    t("section_impact_on_environment"),
    t("linked_to_sdgs"),
  ];

  return (
    <div className="w-full relative">
      <div className="fixed top-10 right-2 z-50">
      <SpeakText file="showcase-banner"/>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        @media (max-width: 768px) {
          .parallax-bg {
            background-attachment: scroll;
          }
        }
      `}</style>

      {/* Hero Banner Section */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/bg-eco.webp?height=800&width=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        <div
          className={`relative z-10 text-center text-white px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            {titleDesription}
          </p>

          <div className="mt-8 w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-green-50">
        <div className="space-y-16 md:space-y-24">
          {blockTitles.map((title, index) => {
            const isLastBlock = index === blockTitles.length - 1;

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) blocksRef.current[index] = el;
                }}
                className="opacity-0 transform translate-y-8 transition-all duration-800"
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 lg:gap-16`}
                >
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                      <div className="aspect-[4/3] relative">
                        {/* Main Image with conditional blur */}
                        <Image
                          src={
                            images[index] ||
                            `/placeholder.svg?height=400&width=600`
                          }
                          alt={`${title} illustration`}
                          fill
                          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                            isLastBlock ? "blur-sm" : ""
                          }`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Overlay logos if it's the last block */}
                        {isLastBlock &&
                          Array.isArray(logoImages?.[index]) &&
                          (logoImages[index] ?? []).length > 0 && (
                            <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-4 p-4">
                              {(logoImages[index] ?? []).map(
                                (logoSrc: string, logoIdx: number) => {
                                  const imageName = logoSrc.split("/").pop(); // e.g. "11.webp"
                                  const goalNumber = imageName?.split(".")[0]; // e.g. "11"

                                  return (
                                    <a
                                      key={logoIdx}
                                      href={`https://sdgs.un.org/goals/goal${goalNumber}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-28 h-28 relative"
                                    >
                                      <Image
                                        src={logoSrc}
                                        alt={`Logo ${logoIdx + 1}`}
                                        fill
                                        className="object-contain"
                                      />
                                    </a>
                                  );
                                }
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Text Section */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="space-y-4 ml-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        <div className="h-px bg-gradient-to-r from-blue-500 to-purple-600 flex-1"></div>
                      </div>

                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        {title}
                      </h2>
                    </div>

                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                        {descriptions[index] ||
                          `Discover the fascinating details about ${title.toLowerCase()} and how it shapes our approach to innovation and sustainability.`}
                      </p>
                      <div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        ref={footerRef}
        className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/new-pic10.webp?height=600&width=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/70"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-24"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-24"></div>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t("thanks_heading")}
            </h3>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              {t("thanks_subheading")}
            </p>
            <p className="text-lg md:text-xl text-white/80 pt-2">
              {t("thanks_message")}
            </p>
            <div className="pt-6">
              <a
                href="/"
                className="inline-block px-6 py-3 bg-transparent text-white border border-white font-semibold rounded-lg shadow hover:bg-white hover:text-black transition duration-300"
              >
                {t("thanks_back_home")}
              </a>
            </div>
            l
          </div>
        </div>
      </section>
    </div>
  );
}
