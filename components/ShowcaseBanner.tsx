"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider.";

interface ShowcaseBannerProps {
  descriptions: string[];
  images: string[];
  title: string;
  titleDesription: string;
}

export default function ShowcaseBanner({
  descriptions,
  images,
  title,
  titleDesription,
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

    // Observe hero section
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Observe content blocks
    blocksRef.current.forEach((block) => {
      if (block) observer.observe(block);
    });

    // Observe footer
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Initial hero animation
    setTimeout(() => setIsVisible(true), 100);

    return () => observer.disconnect();
  }, []);

  const blockTitles = [
    t("section_how_we_made_it"),
    t("section_about_it"),
    t("section_impact_on_environment"),
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Custom CSS for animations */}
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
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
        className=" relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/bg-eco.jpg?height=800&width=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>

        {/* Hero Content */}
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
      <section className=" py-16 md:py-24 px-4 md:px-8 bg-green-50">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {blockTitles.map((title, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) blocksRef.current[index] = el;
              }}
              className={`opacity-0 transform translate-y-8 transition-all duration-800 delay-${
                index * 200
              }`}
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-16`}
              >
                {/* Image Container */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={
                          images[index] ||
                          `/placeholder.svg?height=400&width=600`
                        }
                        alt={`${title} illustration`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
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

                  <div className="glass-effect rounded-xl p-6 md:p-8 shadow-lg">
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                      {descriptions[index] ||
                        `Discover the fascinating details about ${title.toLowerCase()} and how it shapes our approach to innovation and sustainability.`}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex items-center gap-2 pt-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        ref={footerRef}
        className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/bg-forest.jpg?height=600&width=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/70"></div>

        {/* Footer Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="space-y-8">
            {/* Decorative Line */}
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

            {/* Thank You Text */}
            <p className="text-lg md:text-xl text-white/80 pt-2">
              {t("thanks_message")}
            </p>

            {/* Back to Homepage Button */}
            <div className="pt-6">
              <a
                href="/"
                className="inline-block px-6 py-3 bg-transparent text-white border border-white font-semibold rounded-lg shadow hover:bg-white hover:text-black transition duration-300"
              >
                {t("thanks_back_home")}
              </a>
            </div>

            {/* Decorative Icons */}
            <div className="flex justify-center gap-6 pt-10">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
                </svg>
              </div>
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
